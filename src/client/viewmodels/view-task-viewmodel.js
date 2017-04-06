import Viewmodel from 'client/viewmodels/viewmodel';

export default class ViewTaskViewmodel extends Viewmodel {
  get projectIconUrl() { return this.task.project.iconUrl }

  get projectId() { return this.task.project.id; }

  get projectName() { return this.task.project.name; }

  get taskId() { return this.task.id; }

  get summary() { return this.task.summary; }

  get priority() { return this.task.priority; }

  get description() { return this.task.description; }

  get assignee() {
    if (this.task.assignee == null) return 'Unassigned';
    return this.task.assignee.name;
  }

  get estEffort() { return 15; }

  get workedEffort() { return 0; }

  get targetDate() { return {toString: () => '28/12/2017'}; }

  get state() { return 'Open'; }

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
