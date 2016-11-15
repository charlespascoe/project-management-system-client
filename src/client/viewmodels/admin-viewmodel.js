import Viewmodel from 'client/viewmodels/viewmodel';
import usersManager from 'client/managers/users-manager';
import userManager from 'client/managers/user-manager';
import adminNavigator from 'client/navigation/admin-navigator';
import {
  UnauthorisedStatus,
  UnauthenticatedStatus
} from 'client/apis/statuses';

class UserViewmodel extends Viewmodel {
  get id() { return this.user.id; }

  get fullName() { return this.user.name; }

  constructor(user) {
    super();
    this.user = user;
  }
}

export default class AdminViewmodel extends Viewmodel {
  get users() { return this._users; }
  set users(value) { this._users = value; this.changed(); }

  get projects() { return this._projects; }
  set projects(value) { this._projects = value; this.changed(); }

  get loading() { return this._loading; }
  set loading(value) { this._loading = value; this.changed(); }

  constructor(userManager, usersManager, adminNavigator) {
    super();
    this.userManager = userManager;
    this.usersManager = usersManager;
    this.adminNavigator = adminNavigator;
    this.users = [];
    this.projects = [];
  }

  static createDefault() {
    return new AdminViewmodel(userManager, usersManager, adminNavigator);
  }

  onEnter(nav) {
    super.onEnter(nav);

    this.refresh();
  }

  addUser() {
    this.adminNavigator.showAddUserDialogue();
  }

  async refresh() {
    if (this.loading) return;

    this.loading = true;

    var usersResponse = await this.usersManager.getAllUsers();

    if (!usersResponse.isOk) {
      if (usersResponse.status instanceof UnauthorisedStatus) {
        this.userManager.elevationExpired();
        return;
      } else if (usersResponse.status instanceof UnauthenticatedStatus) {
        // Unauthenticated responses automatically go to login page
        return;
      }

      // Something went wrong!
      return;
    }

    this.users = usersResponse.data.map(user => new UserViewmodel(user));

    this.loading = false;
  }

}
