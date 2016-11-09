import Viewmodel from 'client/viewmodels/viewmodel';

export default class HomeViewmodel extends Viewmodel {
  onEnter(nav) {
    super.onEnter(nav);
    this.nav.clearHistory();
    this.nav.viewmodel = this;
  }

  static createDefault() {
    return new HomeViewmodel();
  }
}
