import authenticationClient from 'client/auth/authentication-client';
import userApi from 'client/apis/user-api';

export class UserManager {
  get user() { return this._user; }
  set user(value) {
    this._user = value;
    if (this.onUserChanged) this.onUserChanged(value);
  }

  constructor(authClient, userApi) {
    this.authClient = authClient;
    this.userApi = userApi;
    this.user = null;
  }

  async initialise() {
    if (!this.authClient.initialise()) return false;
    var response = await this.getUser();

    if (!response.isOk) {
      await this.logout();
      return false;
    }

    return true;
  }

  async login(username, password, longExpiry) {
    var response = await this.authClient.login(username, password, longExpiry);

    if (!response.isOk) return response;

    this.username = username;

    return await this.getUser();
  }

  async getUser() {
    var response = await this.userApi.getUser();

    if (response.isOk) {
      this.user = response.data;
    } else {
      this.user = null;
    }

    return response;
  }

  async logout() {
    this.user = null;
    await this.authClient.logout();
  }
}

export default new UserManager(authenticationClient, userApi);
