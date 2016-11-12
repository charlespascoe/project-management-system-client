import authenticationClient from 'client/auth/authentication-client';
import usersApi from 'client/apis/users-api';
import authApi from 'client/apis/authentication-api';
import {
  UnauthorisedStatus
} from 'client/apis/statuses';

export class UserManager {
  get user() { return this._user; }
  set user(value) {
    this._user = value;
    if (this.onUserChanged) this.onUserChanged(value);
  }

  constructor(authClient, usersApi, authApi) {
    this.authClient = authClient;
    this.usersApi = usersApi;
    this.authApi = authApi;
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

    var response = await this.usersApi.getUser(this.userId);

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

  async requestElevation(password) {
    // Force a token refresh
    var refreshResponse = await this.authClient.refresh();

    if (!refreshResponse.isOk) return refreshResponse;

    var response = await this.authApi.requestElevation(this.authClient.tokens.accessToken, password);

    if (!response.isOk) return response;

    this.user.sysadmin = true; // If the above request was successful, assume they are sysadmin
    this.user.sysadminElevationExpires = response.data.sysadminElevationExpires;

    // This is to cover any issues involving the expiry timestamp being in the past
    if (!this.user.isSysadminElevated) return new Response(new UnauthorisedStatus());

    if (this.onUserChanged) this.onUserChanged();

    return response;
  }

  async dropElevation() {
    var response = await this.authApi.dropElevation(this.authClient.tokens.accessToken);

    // Unauthorised response (403) if the user isn't a sysadmin, which although it shouldn't happen, is fine
    if (response.status instanceof UnauthorisedStatus) response.status = new SuccessStatus();

    return response;
  }
}

export default new UserManager(authenticationClient, usersApi, authApi);
