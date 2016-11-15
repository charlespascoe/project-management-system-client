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
    if (!this.userManager.user || !this.userManager.user.isSysadminElevated) return new Response(new UnauthorisedStatus());

    return await this.usersApi.addUser(data);
  }

  async getAllUsers() {
    if (!this.userManager.user || !this.userManager.user.isSysadminElevated) return new Response(new UnauthorisedStatus());

    var response = await this.usersApi.getAllUsers();

    if (response.isOk) this.users = response.data;

    return response;
  }
}

export default new UsersManager(usersApi, userManager);
