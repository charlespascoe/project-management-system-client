import authenticationClient from 'client/auth/authentication-client';
import usersApi from 'client/apis/users-api';
import authApi from 'client/apis/authentication-api';
import notificationQueue from 'client/notification-queue';
import {
  UnauthorisedStatus,
  UnauthenticatedStatus
} from 'client/apis/statuses';

export class UserManager {
  get user() { return this._user; }
  set user(value) {
    this._user = value;
    if (this.onUserChanged) this.onUserChanged();
  }

  constructor(authClient, usersApi, authApi, notificationQueue) {
    this.authClient = authClient;
    this.usersApi = usersApi;
    this.authApi = authApi;
    this.notificationQueue = notificationQueue;
    this.user = null;
    this.authClient.onUnauthenticated = this.loginExpired.bind(this);
  }

  async initialise() {
    if (!this.authClient.initialise()) {
      this.loginExpired(false);
      return false;
    }

    this.userId = localStorage.getItem('userId');

    var response = await this.getUser();

    if (!response.isOk) {
      this.loginExpired();
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

  loginExpired(showMessage = true) {
    this.user = null;
    localStorage.removeItem('userId');
    this.authClient.clearTokens();
    if (showMessage) this.notificationQueue.showDangerNotification('Sorry, your login has expired. Please enter you username and password again.');
    if (this.onLogout) this.onLogout();
  }

  async logout() {
    this.user = null;
    localStorage.removeItem('userId');
    await this.authClient.logout();
    if (this.onLogout) this.onLogout();
  }

  async requestElevation(password) {
    // Force a token refresh
    var refreshResponse = await this.authClient.refresh();

    if (!refreshResponse.isOk) {
      if (refreshResponse.status instanceof UnauthenticatedStatus) this.loginExpired();
      return refreshResponse;
    }

    var response = await this.authApi.requestElevation(this.authClient.tokens.accessToken, password);

    if (!response.isOk) return response;

    this.user.sysadmin = true; // If the above request was successful, assume they are sysadmin
    this.user.sysadminElevationExpires = response.data.sysadminElevationExpires;

    // This is to cover any issues involving the expiry timestamp being in the past
    if (!this.user.isSysadminElevated) return new Response(new UnauthorisedStatus());

    if (this.onUserChanged) this.onUserChanged();
    this.notificationQueue.showInfoNotification('You now have administrator priviledges');

    return response;
  }

  async dropElevation() {
    if (this.isDroppingElevation) return new Response(new SuccessStatus());

    this.isDroppingElevation = true;
    var response = await this.authApi.dropElevation(this.authClient.tokens.accessToken);
    this.isDroppingElevation = false;

    if (response.status instanceof UnauthenticatedStatus) {
      this.loginExpired();
      return response;
    }

    this.notificationQueue.showInfoNotification('You have dropped your administrator priviledges');

    // Unauthorised response (403) if the user isn't a sysadmin, which although it shouldn't happen, is fine
    if (response.status instanceof UnauthorisedStatus) response.status = new SuccessStatus();

    this.elevationExpired(false);

    return response;
  }

  async elevationExpired(showMessage = true) {
    if (!this.user) return;
    this.user.sysadminElevationExpires = null;
    if (showMessage) this.notificationQueue.showDangerNotification('Your administrator priviledges have expired');
    if (this.onUserChanged) this.onUserChanged();
    if (this.onElevationDropped) this.onElevationDropped();
  }
}

export default new UserManager(authenticationClient, usersApi, authApi, notificationQueue);
