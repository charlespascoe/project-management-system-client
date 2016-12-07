import Viewmodel from 'client/viewmodels/viewmodel';
import taskNavigator from 'client/navigation/task-navigator';

export default class ViewProjectViewmodel extends Viewmodel {
  get projectName() { return this.project ? this.project.name : ''; }
  get projectId() { return this.project ? this.project.id : ''; }
  get iconUrl() { return this.project ? this.project.iconUrl : '' }

  constructor(taskNavigator) {
    super();
    this.taskNavigator = taskNavigator;
  }

  static createDefault() {
    return new ViewProjectViewmodel(taskNavigator);
  }

  onEnter(nav) {
    super.onEnter(nav);
    this.project = nav.navData.project;
    this.changed();
  }

  async addTask() {
    await this.taskNavigator.addTask(this.project);
  }
}
