import DialogueViewmodel from 'client/viewmodels/dialogues/dialogue-viewmodel';
import usersManager from 'client/managers/users-manager';
import notificationQueue from 'client/notification-queue';
import User from 'client/models/user';
import Utils from 'client/utils';
import {
  UnauthenticatedStatus,
  UnauthorisedStatus,
  ConflictErrorStatus,
  NoInternetStatus
} from 'client/apis/statuses';

export default class AddUserDialogueViewmodel extends DialogueViewmodel {
  get firstName() { return this._firstName; }
  set firstName(value) {
    this._firstName = value;
    this.firstNameValid = true;
    this.clearMessages();
  }

  get firstNameValid() { return this._firstNameValid; }
  set firstNameValid(value) { this._firstNameValid = value; this.changed(); }

  get otherNames() { return this._otherNames; }
  set otherNames(value) {
    this._otherNames = value;
    this.otherNamesValid = true;
    this.clearMessages();
  }

  get otherNamesValid() { return this._otherNamesValid; }
  set otherNamesValid(value) { this._otherNamesValid = value; this.changed(); }

  get email() { return this._email; }
  set email(value) {
    this._email = value;
    this.emailValid = true;
    this.clearMessages();
  }

  get emailValid() { return this._emailValid; }
  set emailValid(value) { this._emailValid = value; this.changed(); }

  get allValid() {
    return (
      User.schema.firstName.validate(this.firstName) &&
      User.schema.otherNames.validate(this.otherNames) &&
      User.schema.email.validate(this.email)
    );
  }

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

  get loading() { return this._loading; }
  set loading(value) { this._loading = value; this.changed(); }

  constructor(usersManager, notificationQueue) {
    super();
    this.usersManager = usersManager;
    this.notificationQueue = notificationQueue;
    this.firstName = '';
    this.otherNames = '';
    this.email = '';
    this.loading = false;
    this.errorMessage = '';
  }

  static createDefault() {
    return new AddUserDialogueViewmodel(usersManager, notificationQueue);
  }

  clearMessages() {
    this.warningMessage = '';
    this.errorMessage = '';
  }

  firstNameEntered() {
    this.firstNameValid = User.schema.firstName.validate(this.firstName);
  }

  otherNamesEntered() {
    this.otherNamesValid = User.schema.otherNames.validate(this.otherNames);
  }

  emailEntered() {
    this.emailValid = User.schema.email.validate(this.email);
  }

  async addUser() {
    if (!this.allValid || this.loading) return;

    this.loading = true;
    this.clearMessages();

    var response = await this.usersManager.addUser({
      email: this.email.toLowerCase(),
      firstName: this.firstName,
      otherNames: this.otherNames
    });

    if (response.isOk) {
      this.dismiss();
      this.notificationQueue.showSuccessNotification(`Successfully added ${this.firstName} ${this.otherNames} as a user`);
      return;
    }

    if (response.status instanceof UnauthenticatedStatus || response.status instanceof UnauthorisedStatus) {
      // Login expired, or elevation revoked or expired - hide dialogue
      this.dismiss();
      return;
    } else if (response.status instanceof ConflictErrorStatus) {
      this.warningMessage = `A user with the email <b>${Utils.escapeHtml(this.email)}</b> already exists`;
    } else if (response.status instanceof NoInternetStatus) {
      this.errorMessage = 'No Internet Connection';
    } else {
      this.errorMessage = 'An unknown error occurred';
    }

    this.loading = false;
  }
}
