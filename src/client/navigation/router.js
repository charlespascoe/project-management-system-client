class BackHandler {
  constructor() {
    history.pushState(null, '');
    window.onpopstate = this.onPopState.bind(this);
  }

  onPopState() {
    history.pushState(null, '');
    if (this.onBack) this.onBack();
  }
}

class ViewAction {
  constructor(viewId, router) {
    this.viewId = viewId;
    this.router = router;
  }

  // entryHandler(viewId, nav, navData)
  // viewId -> The view that is about to be navigated to
  // nav -> The current view, as represented by an instance of Navigation
  // navData -> Optional data to pass to the view
  onEnter(entryHandler) {
    this.router.entryHandlers[this.viewId] = entryHandler;
  }

  // doneHandler(nav, navData)
  // nav -> The Navigation instance of the view that is now done
  // navData -> The optional data the view is passing to whatever view is next
  onDone(doneHandler) {
    this.router.doneHandlers[this.viewId] = doneHandler;
  }

  onDoneGoTo(viewId) {
    this.router.doneHandlers[this.viewId] = async function (nav, navData) {
      await this.router.navigate(viewId, navData);
    }.bind(this);
  }

  onDoneGoBack() {
    this.router.doneHandlers[this.viewId] = async function (nav, navData) {
      this.router.back(navData);
    }.bind(this);
  }
}

class Navigation {
  constructor(router, viewId, navData, prevNav) {
    this.router = router;
    this.viewId = viewId;
    this.navData = navData;
    this.prevNav = prevNav;
    this.viewmodel = null;
  }

  clearHistory() {
    if (this.router.currentNav !== this) return;
    this.prevNav = null;
  }

  back(navData = null) {
    if (this.router.currentNav !== this) return;
    this.router.back(navData);
  }

  async done(navData = null) {
    if (this.router.currentNav !== this) return;
    this.router.done(navData);
  }
}

export class Router {
  constructor(backHandler) {
    this.entryHandlers = {};
    this.doneHandlers = {};
    this.currentNav = null;

    this.changeView = function (viewId, navData) {
      throw new Error('No changeView handler set');
    };

    backHandler.onBack = this.back.bind(this);
  }

  view(viewId) {
    return new ViewAction(viewId, this);
  }

  clearHistory() {
    if (!this.currentNav) return;
    this.currentNav.prevNav = null;
  }

  goToView(viewId, navData = null) {
    this.currentNav = new Navigation(this, viewId, navData, this.currentNav);
    this.changeView(this.currentNav);
  }

  back(navData = null) {
    if (this.currentNav.prevNav == null) return;

    this.currentNav = this.currentNav.prevNav;
    this.currentNav.navData = navData;
    this.changeView(this.currentNav);
  }

  async navigate(viewId, navData = null) {
    if (viewId in this.entryHandlers) {
      await this.entryHandlers[viewId](viewId, this.currentNav, navData);
    } else {
      this.goToView(viewId, navData);
    }
  }

  async done(navData = null) {
    await this.doneHandlers[this.currentNav.viewId](navData);
  }

  validateHandlers(viewMap) {
    var missingDoneHandlers = [];
    for (var { viewId, view } of viewMap) {
      if (!(viewId in this.doneHandlers)) {
        missingDoneHandlers.push(viewId);
      }
    }

    return missingDoneHandlers.length > 0 ? missingDoneHandlers : null;
  }
}

export default new Router(new BackHandler());
