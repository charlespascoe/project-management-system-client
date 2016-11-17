import Viewmodel from 'client/viewmodels/viewmodel';
import userManager from 'client/managers/user-manager';
import usersManager from 'client/managers/users-manager';
import adminNavigator from 'client/navigation/admin-navigator';
import notificationQueue from 'client/notification-queue';
import Utils from 'client/utils';
import {
  UnauthorisedStatus,
  UnauthenticatedStatus
} from 'client/apis/statuses';

class UserViewmodel extends Viewmodel {
  get id() { return this.model.id; }

  get isCurrentUser() { return this.id == this.userManager.user.id }

  get fullName() { return this.model.name; }

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
    this.loading = false;

    if (response.isOk) {
      this.notificationQueue.showSuccessNotification(`Removed ${this.fullName} as a user`);
    } else if (!(response.status instanceof UnauthenticatedStatus || response.status instanceof UnauthorisedStatus)) {
      this.notificationQueue.showDangerNotification(`Something went wrong when trying to delete ${this.fullName}`);
      return;
    }

    this.onDelete();
  }
}

export default class AdminViewmodel extends Viewmodel {
  get users() { return this._users; }
  set users(value) { this._users = value; this.changed(); }

  get projects() { return this._projects; }
  set projects(value) { this._projects = value; this.changed(); }

  get loading() { return this._loading; }
  set loading(value) { this._loading = value; this.changed(); }

  constructor(usersManager, adminNavigator, notificationQueue) {
    super();
    this.usersManager = usersManager;
    this.adminNavigator = adminNavigator;
    this.notificationQueue = notificationQueue;
    this.users = [];
    this.projects = [];
  }

  static createDefault() {
    return new AdminViewmodel(usersManager, adminNavigator, notificationQueue);
  }

  onEnter(nav) {
    super.onEnter(nav);
    this.refresh();
  }

  async addUser() {
    await this.adminNavigator.showAddUserDialogue();
    await this.refresh();
  }

  async refresh() {
    if (this.loading) return;

    this.loading = true;

    var usersResponse = await this.usersManager.getAllUsers();

    // Unauthenticated and Unauthorised responses already handled by UsersManager
    if (usersResponse.status instanceof UnauthorisedStatus || usersResponse.status instanceof UnauthenticatedStatus) return;

    if (!usersResponse.isOk) {
      this.notificationQueue.showDangerNotification('Something when wrong when contacting the server');
      this.loading = false;
      return;
    }

    Utils.updateArray(usersResponse.data.map(user => UserViewmodel.createDefault(user, () => this.refresh())), this.users, (user1, user2) => user1.id - user2.id, (newVm, oldVm) => oldVm.model = newVm.model);
    this.changed();

    this.loading = false;
  }

}
