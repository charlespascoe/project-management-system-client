import DialogueViewmodel from 'client/viewmodels/dialogues/dialogue-viewmodel';
import projectsManager from 'client/managers/projects-manager';
import notificationQueue from 'client/notification-queue';
import Project from 'client/models/project';
import Utils from 'client/utils';
import {
  UnauthenticatedStatus,
  UnauthorisedStatus,
  ConflictErrorStatus,
  NoInternetStatus
} from 'client/apis/statuses';

export default class AddProjectDialogueViewmodel extends DialogueViewmodel {
  get projectID() { return this._projectID; }
  set projectID(value) {
    this._projectID = value;
    this.projectIDValid = true;
    this.clearMessages();
  }

  get projectIDValid() { return this._projectIDValid; }
  set projectIDValid(value) { this._projectIDValid = value; this.changed(); }

  get projectName() { return this._projectName; }
  set projectName(value) {
    this._projectName = value;
    this.projectNameValid = true;
    this.clearMessages();
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
  set errorMessage(value) {
    if (value) this.clearMessages();
    this._errorMessage = value;
    this.changed();
  }

  get warningMessage() { return this._warningMessage; }
  set warningMessage(value) {
    if (value) this.clearMessages();
    this._warningMessage = value;
    this.changed();
  }

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

  clearMessages() {
    this.warningMessage = '';
    this.errorMessage = '';
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
    this.clearMessages();

    var response = await this.projectsManager.createProject({
      id: this.projectID,
      name: this.projectName
    });

    if (response.isOk) {
      this.dismiss();
      this.notificationQueue.showSuccessNotification(`Successfully created ${this.projectName} project`);
      return;
    }

    if (response.status instanceof UnauthenticatedStatus || response.status instanceof UnauthorisedStatus) {
      // Login expired, or elevation revoked or expired - hide dialogue
      this.dismiss();
      return;
    } else if (response.status instanceof ConflictErrorStatus) {
      this.warningMessage = `A project with the ID <b>${Utils.escapeHtml(this.projectID)}</b> already exists`;
    } else if (response.status instanceof NoInternetStatus) {
      this.errorMessage = 'No Internet Connection';
    } else {
      this.errorMessage = 'An unknown error occurred';
    }

    this.loading = false;
  }
}

