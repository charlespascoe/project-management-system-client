import router from 'client/navigation/router';
import userManager from 'client/managers/user-manager';
import loginNavigator from 'client/navigation/login-navigator';

export class HomeNavigator {
  constructor(router, loginNavigator, userManager) {
    this.router = router;
    this.loginNavigator = loginNavigator;
    this.userManager = userManager;
  }

  async startApp() {
    if (await this.userManager.initialise()) {
      await this.router.navigate('home');
    } else {
      await this.loginNavigator.goToLogin();
    }
  }

  async logout() {
    await this.loginNavigator.goToLogin();
    await this.userManager.logout();
  }
}

export default new HomeNavigator(router, loginNavigator, userManager);
