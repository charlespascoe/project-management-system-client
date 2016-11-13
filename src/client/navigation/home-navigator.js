import router from 'client/navigation/router';
import userManager from 'client/managers/user-manager';
import loginNavigator from 'client/navigation/login-navigator';
import dialogueManager from 'client/managers/dialogue-manager';

export class HomeNavigator {
  constructor(router, loginNavigator, userManager, dialogueManager) {
    this.router = router;
    this.loginNavigator = loginNavigator;
    this.userManager = userManager;
    this.dialogueManager = dialogueManager;
    this.userManager.onLogout = this.onLogout.bind(this);
  }

  async requestElevationDialogue() {
    this.dialogueManager.showRequestElevationDialogue();
  }

  async startApp() {
    if (await this.userManager.initialise()) {
      await this.router.navigate('home');
    }
  }

  async logout() {
    await this.userManager.logout();
  }

  async onLogout() {
    await this.loginNavigator.goToLogin();
  }
}

export default new HomeNavigator(router, loginNavigator, userManager, dialogueManager);
