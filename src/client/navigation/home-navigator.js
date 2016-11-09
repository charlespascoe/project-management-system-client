import router from 'client/navigation/router';
import authenticationClient from 'client/auth/authentication-client';
import loginNavigator from 'client/navigation/login-navigator';

export class HomeNavigator {
  constructor(router, loginNavigator, authClient) {
    this.router = router;
    this.loginNavigator = loginNavigator;
    this.authClient = authClient;
  }

  async startApp() {
    if (this.authClient.initialise()) {
      await this.router.navigate('home');
    } else {
      await this.loginNavigator.goToLogin();
    }
  }

  async logout() {
    this.authClient.clearTokens();
    await this.loginNavigator.goToLogin();
  }
}

export default new HomeNavigator(router, loginNavigator, authenticationClient);
