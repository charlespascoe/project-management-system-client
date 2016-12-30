import Viewmodel from 'client/viewmodels/viewmodel';

export default class ViewTaskViewmodel extends Viewmodel {
  get projectIconUrl() { return this.task ? this.task.project.iconUrl : ''; }
  get projectId() { return this.task ? this.task.project.id : ''; }
  get taskId() { return this.task ? this.task.id : ''; }
  get summary() { return this.task ? this.task.summary : ''; }

  constructor() {
    super();
  }

  static createDefault() {
    return new ViewTaskViewmodel();
  }

  onEnter(nav) {
    super.onEnter(nav);

    if (nav.navData == null || nav.navData.task == null) {
      console.warn('ViewTaskViewmodel.onEnter: No task - going back');
      this.back();
      return;
    }

    this.task = nav.navData.task;
    this.changed();
  }
}
