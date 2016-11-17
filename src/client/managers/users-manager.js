import usersApi from 'client/apis/users-api';
import userManager from 'client/managers/user-manager';
import Response from 'client/apis/response';
import {
  UnauthorisedStatus
} from 'client/apis/statuses';

export class UsersManager {
  constructor(usersApi, userManager) {
    this.usersApi = usersApi;
    this.userManager = userManager;
    this.users = [];
  }

  async addUser(data) {
    var response;

    if (!this.userManager.user || !this.userManager.user.isSysadminElevated) {
      response = new Response(new UnauthorisedStatus());
    } else {
      response = await this.usersApi.addUser(data);
    }

    if (response.status instanceof UnauthorisedStatus) this.userManager.elevationExpired();

    return response;
  }

  async getAllUsers() {
    var response;

    if (!this.userManager.user || !this.userManager.user.isSysadminElevated) {
      response = new Response(new UnauthorisedStatus());
    } else {
      response = await this.usersApi.getAllUsers();
    }

    if (response.status instanceof UnauthorisedStatus) this.userManager.elevationExpired();

    if (response.isOk) this.users = response.data;

    return response;
  }
}

export default new UsersManager(usersApi, userManager);
