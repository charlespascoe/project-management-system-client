import Viewmodel from 'client/viewmodels/viewmodel';
import userManager from 'client/managers/user-manager';
import projectsManager from 'client/managers/projects-manager';
import rolesManager from 'client/managers/roles-manager';
import notificationQueue from 'client/notification-queue';
import projectNavigator from 'client/navigation/project-navigator';
import homeNavigator from 'client/navigation/home-navigator';
import AsyncUtils from 'client/async-utils';
import {
  NoInternetStatus
} from 'client/apis/statuses';

class MemberViewmodel extends Viewmodel {
  get model() { return this._model; }
  set model(value) { this._model = value; this.changed(); }

  get isCurrentUser() { return this.id === this.userManager.user.id; }

  get id() { return this.model.user.id; }

  get name() { return this.model.user.firstName; }

  get roles() { return this._roles; }
  set roles(value) { this._roles = value; this.changed(); }

  get selectedRoleId() { return this._selectedRoleId; }
  set selectedRoleId(value) {
    this._selectedRoleId = value;
    this.changed();
    this.chnageRole(value);
  }

  get loading() { return this._loading; }
  set loading(value) { this._loading = value; this.changed(); }

  constructor(member, roles, onRemoved, userManager, notificationQueue) {
    super();
    this.model = member;
    this.roles = roles;
    this.userManager = userManager;
    this._selectedRole = member.role.id;
    this.onRemoved = onRemoved;
  }

  static createDefault(member, roles, onRemoved) {
    return new MemberViewmodel(member, roles, onRemoved, userManager, notificationQueue);
  }

  async changeRole(roleId) {
    if (this.loading) return;

    this.loading = true;
    var response = await this.member.updateMemberRole(roleId);

    // App will automatically navigate to login page
    if (response.isUnauthenticated) return;

    if (response.isUnauthorised) {
      this.selectedRoleId = this.model.role.id;
      this.notificationQueue.showWarningNotification(`You are not authorised to change the role of ${this.name}`);
      this.loading = false;
      return;
    }

    if (!response.isOk) {
      this.notificationQueue.showDangerNotification('Something went wrong when contacting the server');
      this.loading = false;
      return;
    }

    this.notificationQueue.showSuccessNotification(`Successfully changed the role of ${this.name}`);
    this.loading = false;
  }

  async removeMember() {
    if (this.loading) return;

    this.loading = true;
    var response = await this.member.remove();

    // App will automatically navigate to login page
    if (response.isUnauthenticated) return;

    if (response.isUnauthorised) {
      this.notificationQueue.showWarningNotification(`You are not authorised to remove ${this.name} as a member`);
      this.loading = false;
      return;
    }

    if (!response.isOk) {
      this.notificationQueue.showDangerNotification('Something went wrong when contacting the server');
      this.loading = false;
      return;
    }

    if (this.onRemoved) this.onRemoved(this);

    this.notificationQueue.showSuccessNotification(`Successfully removed ${this.name} as a member`);
    this.loading = false;
  }
}

export default class ManageProjectViewmodel extends Viewmodel {
  get projectName() { return this.project ? this.project.name : ''; }
  get projectId() { return this.project ? this.project.id : ''; }

  get members() { return this._members; }
  set members(value) { this._members = value; this.changed(); }

  get loadingMembers() { return this._loadMembers; }
  set loadingMembers(value) { this._loadMembers = value; this.changed(); }

  constructor(projectsManager, rolesManager, notificationQueue, projectNavigator, homeNavigator) {
    super();
    this.projectsManager = projectsManager;
    this.rolesManager = rolesManager;
    this.notificationQueue = notificationQueue;
    this.projectNavigator = projectNavigator;
    this.homeNavigator = homeNavigator;
  }

  static createDefault() {
    return new ManageProjectViewmodel(projectsManager, rolesManager, notificationQueue, projectNavigator, homeNavigator);
  }

  onEnter(nav) {
    super.onEnter(nav);
    this.project = nav.navData.project;
    this.changed();
    this.loadMembers();
  }

  async loadMembers(forceReload = false) {
    if (this.loadingMembers) return;

    this.loadingMembers = true;

    var { membersResult, rolesResult } = await AsyncUtils.whenAllForResult({
      members: this.project.getMembers(forceReload),
      roles: this.rolesManager.getRoles()
    });

    if (membersResult.isUnauthenticated || rolesResult.isUnauthenticated) return;

    if (membersResult.isUnauthorised || rolesResult.isUnauthorised) {
      this.notificationQueue.showWarningNotification('You are not authorised to manage this project');
      await this.homeNavigator.goHome();
      return;
    }

    if (membersResult.status instanceof NoInternetStatus || rolesResult.status instanceof NoInternetStatus) {
      this.notificationQueue.showDangerNotification('No Internet Connection');
      this.loadingMembers = false;
      return;
    }

    if (!membersResult.isOk || !rolesResult.isOk) {
      this.notificationQueue.showDangerNotification('Something went wrong when contacting the server');
      this.loadingMembers = false;
      return;
    }

    this.members = membersResult.data.map(member => MemberViewmodel.createDefault(member, rolesResult.data, vm => this.memberRemoved(vm)));
    this.loadingMembers = false;
  }

  async addMember() {
    await this.projectNavigator.showAddMemberDialogue(this.project);
    await this.loadMembers(true);
  }

  memberRemoved(memberVm) {
    this.members = this.members.filter(vm => vm !== memberVm);
    this.loadMembers(true);
  }
}
