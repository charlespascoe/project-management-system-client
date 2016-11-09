import Observable from 'client/observable';

export default class Viewmodel extends Observable {
  onEnter(nav) {
    this.nav = nav;
  }

  async done(navData = null) {
    await this.nav.done(navData);
  }

  back(navData = null) {
    this.nav.back(navData);
  }
}
