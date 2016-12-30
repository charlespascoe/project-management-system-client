import Viewmodel from 'client/viewmodels/viewmodel';
import Task from 'client/models/task';
import DurationParser from 'client/duration-parser';
import notificationQueue from 'client/notification-queue';
import homeNavigator from 'client/navigation/home-navigator';
import taskNavigator from 'client/navigation/task-navigator';
import permissions from 'client/permissions';
import rolesManager from 'client/managers/roles-manager';

export default class EditTaskViewmodel extends Viewmodel {
  get loading() { return this._loading; }
  set loading(value) { this._loading = value; this.changed(); }

  get projectName() { return this.project ? this.project.name : ''; }
  get projectId() { return this.project ? this.project.id : ''; }
  get iconUrl() { return this.project ? this.project.iconUrl : '' }

  get projectMembers() { return this._projectMembers; }
  set projectMembers(value) {
    this._projectMembers = value.filter(member => member.hasPermission(permissions.ASSIGNEE));
    this.changed();
  }

  get isNewTask() { return this.task == null; }

  get summary() { return this._summary; }
  set summary(value) {
    this._summary = value;
    this.summaryValid = true;
    this.changed();
    this.clearMessages();
  }

  get summaryValid() { return this._summaryValid; }
  set summaryValid(value) { this._summaryValid = value; this.changed(); }

  get priority() { return this._priority; }
  set priority(value) {
    this._priority = value;
    this.priorityValid = true;
    this.changed();
    this.clearMessages();
  }

  get estimatedEffort() { return this._estimatedEffort; }
  set estimatedEffort(value) {
    this._estimatedEffort = value;
    this.changed();
    this.estimatedEffortValid = true;
    this.clearMessages();
  }

  get estimatedEffortValid() { return this._estimatedEffortValid; }
  set estimatedEffortValid(value) { this._estimatedEffortValid = value; this.changed(); }

  get targetCompletionDate() { return this._targetCompletionDate; }
  set targetCompletionDate(value) {
    this._targetCompletionDate = value;
    this.targetCompletionDateValid = true;
    this.changed();
    this.clearMessages();
  }

  get targetCompletionDateValid() { return this._targetCompletionDateValid; }
  set targetCompletionDateValid(value) { this._targetCompletionDateValid = value; this.changed(); }

  get assignee() { return this._assignee; }
  set assignee(value) {
    this._assignee = value;
    this.changed();
    this.clearMessages();
  }

  get description() { return this._description; }
  set description(value) {
    this._description = value;
    this.changed();
    this.clearMessages();
  }

  get allValid() {
    return (
      Task.schema.summary.validate(this.summary) &&
      Task.schema.estimatedEffort.validate(this.estimatedEffort) &&
      Task.schema.targetCompletionDate.validate(this.targetCompletionDate)
    );
  }

  get errorMessage() { return this._errorMessage; }
  set errorMessage(value) {
    if (value) this.clearMessages();
    this._errorMessage = value;
    this.changed();
  }

  constructor(notificationQueue, homeNavigator, rolesManager, taskNavigator) {
    super();
    this.notificationQueue = notificationQueue;
    this.homeNavigator = homeNavigator;
    this.rolesManager = rolesManager;
    this.taskNavigator = taskNavigator;

    this.loading = false;
    this.project = null;
    this.task = null;
    this.summary = '';
    this.priority = 4;
    this.estimatedEffort = '';
    this.targetCompletionDate = '';
    this.assignee = '';
    this.description = '';
    this.projectMembers = [];
  }

  static createDefault() {
    return new EditTaskViewmodel(notificationQueue, homeNavigator, rolesManager, taskNavigator);
  }

  onEnter(nav) {
    super.onEnter(nav);

    if (nav.navData.task) {
      this.task = nav.navData.task;
      this.project = this.task.project;
    } else {
      this.project = nav.navData.project;
    }

    this.changed();
    this.initialise();
  }

  summaryEntered() {
    this.summaryValid = Task.schema.summary.validate(this.summary);
  }

  estimatedEffortEntered() {
    this.estimatedEffortValid = Task.schema.estimatedEffort.validate(this.estimatedEffort);
  }

  targetCompletionDateEntered() {
    this.targetCompletionDateValid = Task.schema.targetCompletionDate.validate(this.targetCompletionDate);
  }

  clearMessages() {
    this.errorMessage = '';
  }

  async initialise() {
    if (this.project.members && this.rolesManager.roles) {
      this.projectMembers = this.project.members;
    } else {
      this.loading = true;
    }

    var rolesResponse = await this.rolesManager.getRoles();
    var membersResponse = await this.project.getMembers();

    if (rolesResponse.isOk && membersResponse.isOk) {
      this.projectMembers = membersResponse.data;
      this.loading = false;
      return;
    }

    if (rolesResponse.isUnauthenticated || membersResponse.isUnauthenticated) return;

    if (rolesResponse.isUnauthorised || membersResponse.isUnauthorised) {
      this.notificationQueue.showWarningNotification('You are not authorised to view this project');
      await this.homeNavigator.goHome();
      return;
    }

    if (rolesResponse.noInternet || membersResponse.noInternet) {
      this.notificationQueue.showDangerNotification('No Internet Connection');
      this.back();
      return;
    }

    this.notificationQueue.showDangerNotification('Something went wrong when contacting the server');
    this.back();
    this.loading = false;
  }

  async save() {
    if (this.isNewTask) {
      await this.addTask();
    } else {
      await this.saveTask();
    }
  }

  async addTask() {
    if (this.loading || !this.allValid) return;
    this.loading = true;
    this.clearMessages();

    var response = await this.project.addTask({
      summary: this.summary,
      priority: parseInt(this.priority),
      estimatedEffort: Task.schema.estimatedEffort.parse(this.estimatedEffort),
      targetCompletion: this.targetCompletionDate,
      assignedUserId: this.assignee ? parseInt(this.assignee) : null,
      description: this.description
    });

    if (response.isOk) {
      var taskResponse = await this.project.getTasks();

      this.notificationQueue.showSuccessNotification(`Successfully created task ${this.project.id}-${response.data.id}: ${this.summary}`);

      if (taskResponse.isOk) {
        var task = this.project.tasks.find(t => t.id == response.data.id);

        if (task) {
          await this.taskNavigator.viewTask(task);
          return;
        }
      }

      this.back();
      return;
    }

    if (response.isUnauthenticated) return;

    if (response.isUnauthorised) {
      this.notificationQueue.showWarningNotification('You are not authorised to add a task to this project');
      this.back();
      return;
    }

    if (response.noInternet) {
      this.errorMessage = 'No Internet Connection';
      this.loading = false;
      return;
    }

    this.errorMessage = 'Something went wrong when contacting the server';
    this.loading = false;
  }

  async saveTask() {

  }
}
