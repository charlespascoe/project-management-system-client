import router from 'client/navigation/router';
import homeNavigator from 'client/navigation/home-navigator';

export class LoginNavigator {
  constructor(router, navigators) {
    this.router = router;
  }

  startApp() {
    this.router.navigate('login');
  }
}
