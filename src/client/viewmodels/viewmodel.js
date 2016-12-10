import Observable from 'client/observable';

export default class Viewmodel extends Observable {
  onEnter(nav) {
    this.nav = nav;
  }

  async done(navData) {
    await this.nav.done(navData);
  }

  back(navData) {
    this.nav.back(navData);
  }
}
