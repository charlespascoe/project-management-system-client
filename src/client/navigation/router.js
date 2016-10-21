class ViewAction {
  constructor(viewId, router) {
    this.viewId = viewId;
    this.router = router;
  }

  onEnter(entryHandler) {
    this.router.entryHandlers[this.viewId] = entryHandler;
  }

  onDone(doneHandler) {
    this.router.doneHandlers[this.viewId] = doneHandler;
  }

  onDoneGoTo(viewId) {
    this.router.doneHandlers[this.viewId] = async function (navArgs) {
      await this.router.navigate(viewId, navArgs);
    }.bind(this);
  }

  onDoneGoBack() {
    this.router.doneHandlers[this.viewId] = async function (navArgs) {
      this.router.back(navArgs);
    }.bind(this);
  }
}

class Navigation {
  constructor(viewId, navArgs, prevNav = null) {
    this.viewId = viewId;
    this.navArgs = navArgs;
    this.prevNav = prevNav;
  }
}

export class Router {
  constructor() {
    this.entryHandlers = {};
    this.doneHandlers = {};
    this.currentNav = null;

    this.changeView = function (viewId, navArgs) {
      throw new Error('No changeView handler set');
    };
  }

  view(viewId) {
    return new ViewAction(viewId, this);
  }

  clearHistory() {
    if (!this.currentNav) return;
    this.currentNav.prevNav = null;
  }

  goToView(viewId, navArgs = null) {
    this.currentNav = new Navigation(viewId, navArgs, this.currentNav);
    this.changeView(viewId, navArgs);
  }

  back(navArgs = null) {
    if (this.currentNav.prevNav == null) return;

    this.currentNav = new Navigation(this.currentNav.prevNav.viewId, navArgs, this.currentNav.prevNav.prevNav);
    this.changeView(this.currentNav.prevNav.viewId, navArgs);
  }

  async navigate(viewId, navArgs = null) {
    if (viewId in this.entryHandlers) {
      await this.entryHandlers[viewId](navArgs);
    } else {
      this.goToView(viewId, navArgs);
    }
  }

  async done(viewId, navArgs = null) {
    await this.doneHandlers[viewId](navArgs);
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

export default new Router();
