import DialogueViewmodel from 'client/viewmodels/dialogues/dialogue-viewmodel';
import projectsManager from 'client/managers/projects-manager';
import notificationQueue from 'client/notification-queue';
import Project from 'client/models/project';
import {
  UnauthenticatedStatus,
  UnauthorisedStatus,
  ConflictErrorStatus
} from 'client/apis/statuses';

export default class AddProjectDialogueViewmodel extends DialogueViewmodel {
  get projectID() { return this._projectID; }
  set projectID(value) {
    this._projectID = value;
    this.projectIDValid = true;
    this.errorMessage = '';
  }

  get projectIDValid() { return this._projectIDValid; }
  set projectIDValid(value) { this._projectIDValid = value; this.changed(); }

  get projectName() { return this._projectName; }
  set projectName(value) {
    this._projectName = value;
    this.projectNameValid = true;
    this.errorMessage = '';
  }

  get projectNameValid() { return this._projectNameValid; }
  set projectNameValid(value) { this._projectNameValid = value; this.changed(); }

  get allValid() {
    return (
      Project.schema.id.validate(this.projectID) &&
      Project.schema.name.validate(this.projectName)
    );
  }

  get loading() { return this._loading; }
  set loading(value) { this._loading = value; this.changed(); }

  get errorMessage() { return this._errorMessage; }
  set errorMessage(value) { this._errorMessage = value; this.changed(); }

  constructor(projectsManager, notificationQueue) {
    super();
    this.projectsManager = projectsManager;
    this.notificationQueue = notificationQueue;
    this.projectID = '';
    this.projectName = '';
  }

  static createDefault() {
    return new AddProjectDialogueViewmodel(projectsManager, notificationQueue);
  }

  projectIDEntered() {
    this.projectIDValid = Project.schema.id.validate(this.projectID);
  }

  projectNameEntered() {
    this.projectNameValid = Project.schema.name.validate(this.projectName);
  }

  async addProject() {
    if (!this.allValid || this.loading) return;

    this.loading = true;
    this.errorMessage = '';

    var response = await this.projectsManager.createProject({
      id: this.projectID,
      name: this.projectName
    });

    if (response.isOk) {
      this.dismiss();
      this.notificationQueue.showSuccessNotification(`Successfully created the ${this.projectName} project`);
      return;
    }

    if (response.status instanceof UnauthenticatedStatus || response.status instanceof UnauthorisedStatus) {
      // Login expired, or elevation revoked or expired - hide dialogue
      this.dismiss();
      return;
    } else if (response.status instanceof ConflictErrorStatus) {
      this.errorMessage = `A project with the ID '${this.projectID}' already exists`;
    } else {
      this.errorMessage = 'An unknown error occurred';
    }

    this.loading = false;
  }
}

