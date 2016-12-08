import Viewmodel from 'client/viewmodels/viewmodel';
import userManager from 'client/managers/user-manager';
import projectsManager from 'client/managers/projects-manager';
import rolesManager from 'client/managers/roles-manager';
import notificationQueue from 'client/notification-queue';
import projectNavigator from 'client/navigation/project-navigator';
import homeNavigator from 'client/navigation/home-navigator';
import AsyncUtils from 'client/async-utils';
import Utils from 'client/utils';
import {
  NoInternetStatus
} from 'client/apis/statuses';

class MemberViewmodel extends Viewmodel {
  get model() { return this._model; }
  set model(value) {
    this._model = value;
    if (!this.loading) this._selectedRoleId = this.model.role.id;
    this.changed();
  }

  get isCurrentUser() { return this.id === this.userManager.user.id; }

  get id() { return this.model.user.id; }

  get name() { return this.model.user.firstName + ' ' + this.model.user.otherNames; }

  get roles() { return this.rolesManager.roles || []; }

  get selectedRoleId() { return this._selectedRoleId; }
  set selectedRoleId(value) {
    this._selectedRoleId = value;
    this.changed();
    this.changeRole(value);
  }

  get roleName() { return this.model.role.name || `Unknown Role (${this.selectedRoleId})`; }

  get loading() { return this._loading; }
  set loading(value) { this._loading = value; this.changed(); }

  constructor(member, onRemoved, rolesManager, userManager, notificationQueue, projectNavigator) {
    super();
    this.model = member;
    this.userManager = userManager;
    this.rolesManager = rolesManager;
    this.notificationQueue = notificationQueue;
    this.projectNavigator = projectNavigator;
    this.onRemoved = onRemoved;
  }

  static createDefault(member, onRemoved) {
    return new MemberViewmodel(member, onRemoved, rolesManager, userManager, notificationQueue, projectNavigator);
  }

  async changeRole(roleId) {
    if (this.loading) return;

    this.loading = true;
    var response = await this.model.updateMemberRole(roleId);

    // App will automatically navigate to login page
    if (response.isUnauthenticated) return;

    if (response.isUnauthorised) {
      this.selectedRoleId = this.model.role.id;
      this.notificationQueue.showWarningNotification(`You are not authorised to change the role of ${this.name}`);
      this.loading = false;
      return;
    }

    if (!response.isOk) {
      this.selectedRoleId = this.model.role.id;
      this.notificationQueue.showDangerNotification('Something went wrong when contacting the server');
      this.loading = false;
      return;
    }

    this.notificationQueue.showSuccessNotification(`Successfully changed the role of ${this.name} to ${this.roleName}`);
    this.loading = false;
  }

  async removeMember() {
    if (this.loading) return;

    var removeMember = await this.projectNavigator.showRemoveMemberDialogue(this.isCurrentUser ? 'yourself' : this.name, this.model.project.name);

    if (!removeMember) return;

    this.loading = true;
    var response = await this.model.remove();

    // App will automatically navigate to login page
    if (response.isUnauthenticated) return;

    if (response.isUnauthorised) {
      this.notificationQueue.showWarningNotification(`You are not authorised to remove ${this.name} as a member`);
      this.loading = false;
      return;
    }

    if (response.noInternet) {
      this.notificationQueue.showDangerNotification('No Internet Connection');
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
  get iconUrl() { return this.project ? this.project.iconUrl : ''; }

  get members() { return this._members; }
  set members(value) { this._members = value; this.changed(); }

  get loadingMembers() { return this._loadMembers; }
  set loadingMembers(value) { this._loadMembers = value; this.changed(); }

  constructor(projectsManager, rolesManager, notificationQueue, projectNavigator, homeNavigator) {
    super();
    this.members = [];
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
    if (this.project.members && this.rolesManager.roles) this.setMembers(this.project.members);
    this.loadMembers();
  }

  async loadMembers() {
    if (this.loadingMembers) return;

    this.loadingMembers = true;

    var rolesResult = await this.rolesManager.getRoles();
    var membersResult = await this.project.getMembers();

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

    this.setMembers(membersResult.data);
    this.loadingMembers = false;
  }

  setMembers(members) {
    var newViewmodels = members.map(member => MemberViewmodel.createDefault(member, vm => this.memberRemoved(vm)));

    if (this.members.length == 0) {
      this.members = newViewmodels;
      return;
    }

    Utils.updateArray(newViewmodels, this.members, (vm1, vm2) => vm1.id - vm2.id, (newVm, existingVm) => { existingVm.model = newVm.model; return existingVm; });
    this.changed();
  }

  async addMember() {
    await this.projectNavigator.showAddMemberDialogue(this.project);
    await this.loadMembers();
  }

  memberRemoved(memberVm) {
    this.members = this.members.filter(vm => vm !== memberVm);
    this.loadMembers();
  }
}
