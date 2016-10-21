export class ViewMap {
  constructor() {
    this.views = {};
  }

  setView(viewId, view) {
    this.views[viewId] = view;
  }

  getView(viewId) {
    return this.views[viewId];
  }

  *[Symbol.iterator]() {
    for (var viewId in this.views) {
      yield {
        viewId: viewId,
        view: view
      };
    }
  }
}

export default new ViewMap();
