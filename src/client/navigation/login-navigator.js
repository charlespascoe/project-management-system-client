import router from 'client/navigation/router';

export class LoginNavigator {
  constructor(router) {
    this.router = router;

    this.router.view('login').onDoneGoTo('home');
  }

  async goToLogin() {
    await this.router.navigate('login');
    this.router.clearHistory();
  }
}

export default new LoginNavigator(router);
