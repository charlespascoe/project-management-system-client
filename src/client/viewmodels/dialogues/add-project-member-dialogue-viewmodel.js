import DialogueViewmodel from 'client/viewmodels/dialogues/dialogue-viewmodel';
import notificationQueue from 'client/notification-queue';
import rolesManager from 'client/managers/roles-manager';
import AsyncUtils from 'client/async-utils';
import {
  UnauthorisedStatus,
  UnauthenticatedStatus,
  NoInternetStatus
} from 'client/apis/statuses';

class NonMemberViewmodel {
  get id() { return this.model.id; }

  get name() { return this.model.firstName + ' ' + this.model.otherNames; }

  constructor(user) {
    this.model = user;
  }

  compare(otherVm) {
    var a = this.name.toUpperCase(),
        b = otherVm.name.toUpperCase();

    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
}

class RoleViewmodel {
  get id() { return this.model.id; }

  get name() { return this.model.name; }

  constructor(role) {
    this.model = role;
  }

  compare(otherVm) {
    var a = this.name.toUpperCase(),
        b = otherVm.name.toUpperCase();

    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
}

export default class AddProjectMemberDialogueViewmodel extends DialogueViewmodel {
  get nonMembers() { return this._nonMembers; }
  set nonMembers(value) { this._nonMembers = value; this.changed(); }

  get selectedUser() { return this._selectedUser; }
  set selectedUser(value) {
    this._selectedUser = value;
    this.clearMessages();
    this.checkValid();
    this.changed();
  }

  get roles() { return this._roles; }
  set roles(value) { this._roles = value; this.changed(); }

  get selectedRole() { return this._selectedRole; }
  set selectedRole(value) {
    this._selectedRole = value;
    this.clearMessages();
    this.checkValid();
    this.changed();
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

  constructor(project, notificationQueue, rolesManager) {
    super();
    this.project = project;
    this.notificationQueue = notificationQueue;
    this.rolesManager = rolesManager;
    this.roles = [];
    this.nonMembers = [];
    this.selectedUser = '';
    this.selectedRole = '';
    this.initialise();
  }

  static createDefault(project) {
    return new AddProjectMemberDialogueViewmodel(project, notificationQueue, rolesManager);
  }

  checkValid() {
    this.allValid = this.selectedUser != '' && this.selectedRole != '';
  }

  clearMessages() {
    this.warningMessage = '';
    this.errorMessage = '';
  }

  async initialise() {
    if (this.loading) return;

    this.loading = true;
    this.clearMessages();

    var {
      nonMembersResult,
      rolesResult
    } = await AsyncUtils.whenAllForResult({
      nonMembers: this.project.getNonMembers(),
      roles: this.rolesManager.getRoles()
    });

    if (nonMembersResult.isOk && rolesResult.isOk) {
      this.nonMembers = nonMembersResult.data
        .map(user => new NonMemberViewmodel(user))
        .sort((a, b) => a.compare(b));

      this.roles = rolesResult.data
        .map(role => new RoleViewmodel(role))
        .sort((a, b) => a.compare(b));

      this.loading = false;
      return;
    }

    console.log(nonMembersResult, rolesResult);

    if (nonMembersResult.isUnauthenticated || rolesResult.isUnauthenticated) {
      // Login expired, or elevation revoked or expired - hide dialogue
    } else if (nonMembersResult.isUnauthorised || rolesResult.isUnauthorised) {
      this.notificationQueue.showWarningNotification('You are not authorised to add members to this project');
    } else if (nonMembersResult.status instanceof NoInternetStatus || rolesResult.status instanceof NoInternetStatus) {
      this.notificationQueue.showDangerNotification('No Internet Connection');
    } else {
      this.notificationQueue.showDangerNotification('An unknown error occurred');
    }

    this.dismiss();
  }

  async addMember() {
    if (this.loading || !this.allValid) return;

    this.loading = true;

    this.clearMessages();

    var response = await this.project.addMember(this.selectedUser, this.selectedRole);

    if (response.isUnauthenticated) return;
    if (response.isUnauthorised) {
      this.notificationQueue.showWarningNotification('You are not authorised to add a member to this project');
      this.dismiss();
      return;
    }

    if (response.status instanceof NoInternetStatus) {
      this.errorMessage = 'No Internet Connection';
      this.loading = false;
      return;
    }

    if (!response.isOk) {
      this.errorMessage = 'An unknown error occurred';
      this.loading = false;
      return;
    }

    this.notificationQueue.showSuccessNotification(`Successfully added ${this.selectedUser.name} as a member`);
    this.dismiss();
  }
}

