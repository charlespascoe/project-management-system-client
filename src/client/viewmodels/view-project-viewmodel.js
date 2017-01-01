import Viewmodel from 'client/viewmodels/viewmodel';
import taskNavigator from 'client/navigation/task-navigator';
import userManager from 'client/managers/user-manager';
import Utils from 'client/utils';

class TaskViewmodel extends Viewmodel {
  get model() { return this._model; }
  set model(value) { this._model = value; this.changed(); }

  get id() { return this.model.id; }
  get key() { return `${this.model.project.id}-${this.model.id}`; }
  get summary() { return this.model.summary; }

  constructor(task, taskNavigator) {
    super();
    this.model = task;
    this.taskNavigator = taskNavigator;
  }

  static create(task) {
    return new TaskViewmodel(task, taskNavigator);
  }

  async viewTask() {
    await this.taskNavigator.viewTask(this.model);
  }
}

export default class ViewProjectViewmodel extends Viewmodel {
  get projectName() { return this.project ? this.project.name : ''; }
  get projectId() { return this.project ? this.project.id : ''; }
  get iconUrl() { return this.project ? this.project.iconUrl : '' }

  get assignedToMeTasks() { return this._assignedToMeTasks; }
  set assignedToMeTasks(value) { this._assignedToMeTasks = value; this.changed(); }

  get unassignedTasks() { return this._unassignedTasks; }
  set unassignedTasks(value) { this._unassignedTasks = value; this.changed(); }

  get otherTasks() { return this._otherTasks; }
  set otherTasks(value) { this._otherTasks = value; this.changed(); }

  get completedTasks() { return this._completedTasks; }
  set completedTasks(value) { this._completedTasks = value; this.changed(); }

  get loading() { return this._loading; }
  set loading(value) { this._loading = value; this.changed(); }

  constructor(taskNavigator, userManager) {
    super();
    this.taskNavigator = taskNavigator;
    this.userManager = userManager;
    this.assignedToMeTasks = [];
    this.unassignedTasks = [];
    this.otherTasks = [];
    this.completedTasks = [];
  }

  static createDefault() {
    return new ViewProjectViewmodel(taskNavigator, userManager);
  }

  onEnter(nav) {
    super.onEnter(nav);
    this.project = nav.navData.project;
    if (this.project.tasks != null) {
      this.displayTasksList();
    }
    this.changed();
    this.reloadTasks();
  }

  displayTasksList() {
    var groupedTasks = this.project.tasks
      .sort((taskA, taskB) => taskA.id - taskB.id)
      .reduce((groups, task) => {
        if (task.state == 'COMPLETED') {
          groups.completed.push(task);
        } else if (task.assignee == null) {
          groups.unassigned.push(task);
        } else if (task.assignee.id == this.userManager.user.id) {
          groups.assignedToMe.push(task);
        } else {
          groups.other.push(task);
        }

        return groups;
      }, {assignedToMe: [], unassigned: [], other: [], completed: []});

    var keyComparator = (taskVm1, taskVm2) => taskVm1.id - taskVm2.id,
        replaceAction = (newTaskVm, oldTaskVm) => oldTaskVm.model = newTaskVm.model;

    Utils.updateArray(groupedTasks.assignedToMe.map(task => TaskViewmodel.create(task)), this.assignedToMeTasks, keyComparator, replaceAction);
    Utils.updateArray(groupedTasks.unassigned.map(task => TaskViewmodel.create(task)), this.unassignedTasks, keyComparator, replaceAction);
    Utils.updateArray(groupedTasks.other.map(task => TaskViewmodel.create(task)), this.otherTasks, keyComparator, replaceAction);
    Utils.updateArray(groupedTasks.completed.map(task => TaskViewmodel.create(task)), this.completedTasks, keyComparator, replaceAction);
    this.changed();
    console.log(this);
  }

  async reloadTasks() {
    if (this.loading) return;
    this.loading = true;
    var response = await this.project.getTasks();
    this.loading = false;

    if (response.isOk) {
      this.displayTasksList();
      return;
    }

    console.error('Something went wrong:', response);
  }

  async addTask() {
    await this.taskNavigator.addTask(this.project);
  }
}
