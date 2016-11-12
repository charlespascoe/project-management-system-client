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
    this.userId = localStorage.getItem('userId');

    var response = await this.getUser();

    if (!response.isOk) {
      await this.logout();
      return false;
    }

    return true;
  }

  async login(username, password, longExpiry) {
    this.username = null;

    var response = await this.authClient.login(username, password, longExpiry);

    if (!response.isOk) return response;

    this.userId = response.data.userId;

    localStorage.setItem('userId', this.userId);

    return await this.getUser();
  }

  async getUser() {
    if (!this.userId) return null;

    var response = await this.userApi.getUser(this.userId);

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
