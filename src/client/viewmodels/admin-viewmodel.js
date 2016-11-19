import Viewmodel from 'client/viewmodels/viewmodel';
import userManager from 'client/managers/user-manager';
import usersManager from 'client/managers/users-manager';
import projectsManager from 'client/managers/projects-manager';
import adminNavigator from 'client/navigation/admin-navigator';
import notificationQueue from 'client/notification-queue';
import Utils from 'client/utils';
import {
  UnauthorisedStatus,
  UnauthenticatedStatus,
  NoInternetStatus
} from 'client/apis/statuses';

class UserViewmodel extends Viewmodel {
  get id() { return this.model.id; }

  get isCurrentUser() { return this.id == this.userManager.user.id; }

  get fullName() { return this.model.name; }

  get email() { return this.model.email; }

  get model() { return this._model; }
  set model(value) { this._model = value; this.changed(); }

  get loading() { return this._loading; }
  set loading(value) { this._loading = value; this.changed(); }

  constructor(user, adminNavigator, userManager, usersManager, notificationQueue, onDelete) {
    super();
    this.model = user;
    this.adminNavigator = adminNavigator;
    this.userManager = userManager;
    this.usersManager = usersManager;
    this.notificationQueue = notificationQueue;
    this.onDelete = onDelete;
  }

  static createDefault(user, onDelete) {
    return new UserViewmodel(user, adminNavigator, userManager, usersManager, notificationQueue, onDelete);
  }

  async delete() {
    if (this.loading) return;

    var confirmDelete = await this.adminNavigator.showConfirmDeleteUser(this.fullName);

    if (!confirmDelete) return;

    this.loading = true;
    var response = await this.usersManager.deleteUser(this.id);

    if (response.isOk) {
      this.notificationQueue.showSuccessNotification(`Removed ${this.fullName} as a user`);
    } else if (response.status instanceof NoInternetStatus) {
      this.notificationQueue.showDangerNotification('No Internet Connection');
      this.loading = false;
      return;
    } else if (!(response.status instanceof UnauthenticatedStatus || response.status instanceof UnauthorisedStatus)) {
      this.notificationQueue.showDangerNotification(`Something went wrong when trying to delete ${this.fullName}`);
      this.loading = false;
      return;
    }

    this.onDelete();
  }
}

class ProjectViewmodel extends Viewmodel {
  get id() { return this.model.id; }

  get name() { return this.model.name; }

  get memberCount() { return 12; }

  constructor(project) {
    super();
    this.model = project;
  }

  static createDefault(project) {
    return new ProjectViewmodel(project);
  }
}

export default class AdminViewmodel extends Viewmodel {
  get users() { return this._users; }
  set users(value) { this._users = value; this.changed(); }

  get projects() { return this._projects; }
  set projects(value) { this._projects = value; this.changed(); }

  get loadingUsers() { return this._loadingUsers; }
  set loadingUsers(value) { this._loadingUsers = value; this.changed(); }

  get loadingProjects() { return this._loadingProjects; }
  set loadingProjects(value) { this._loadingProjects = value; this.changed(); }

  get loading() { return this.loadingUsers || this.loadingProjects; }

  constructor(usersManager, projectsManager, adminNavigator, notificationQueue) {
    super();
    this.usersManager = usersManager;
    this.projectsManager = projectsManager;
    this.adminNavigator = adminNavigator;
    this.notificationQueue = notificationQueue;
    this.users = [];
    this.projects = [];
  }

  static createDefault() {
    return new AdminViewmodel(usersManager, projectsManager, adminNavigator, notificationQueue);
  }

  onEnter(nav) {
    super.onEnter(nav);
    this.users = this.usersManager.users.map(user => UserViewmodel.createDefault(user, () => this.refreshUsers()));
    this.projects = this.projectsManager.projects.map(proj => ProjectViewmodel.createDefault(proj));
    this.refreshUsers();
    this.refreshProjects();
  }

  async addUser() {
    await this.adminNavigator.showAddUserDialogue();
    await this.refreshUsers();
  }

  async addProject() {
    await this.adminNavigator.showAddProjectDialogue();
    await this.refreshProjects();
  }

  async refreshUsers() {
    if (this.loadingUsers) return;

    this.loadingUsers = true;

    var usersResponse = await this.usersManager.getAllUsers();

    // Unauthenticated and Unauthorised responses already handled by UsersManager
    if (usersResponse.status instanceof UnauthorisedStatus || usersResponse.status instanceof UnauthenticatedStatus) return;

    if (usersResponse.status instanceof NoInternetStatus) {
      this.notificationQueue.showDangerNotification('No Internet Connection');
      this.loadingUsers = false;
      return;
    }

    if (!usersResponse.isOk) {
      this.notificationQueue.showDangerNotification('Something went wrong when contacting the server');
      this.loadingUsers = false;
      return;
    }

    Utils.updateArray(usersResponse.data.map(user => UserViewmodel.createDefault(user, () => this.refreshUsers())), this.users, (user1, user2) => user1.id - user2.id, (newVm, oldVm) => oldVm.model = newVm.model);
    this.changed();

    this.loadingUsers = false;
  }

  async refreshProjects() {
    if (this.loadingProjects) return;

    this.loadingProjects = true;

    var projectsResponse = await this.projectsManager.getAllProjects();

    // Unauthenticated and Unauthorised responses already handled by ProjectsManager
    if (projectsResponse.status instanceof UnauthorisedStatus || projectsResponse.status instanceof UnauthenticatedStatus) return;

    if (projectsResponse.status instanceof NoInternetStatus) {
      this.notificationQueue.showDangerNotification('No Internet Connection');
      this.loadingProjects = false;
      return;
    }

    if (!projectsResponse.isOk) {
      this.notificationQueue.showDangerNotification('Something went wrong when contacting the server');
      this.loadingProjects = false;
      return;
    }

    this.projects = projectsResponse.data.map(proj => ProjectViewmodel.createDefault(proj));

    this.loadingProjects = false;
  }
}
