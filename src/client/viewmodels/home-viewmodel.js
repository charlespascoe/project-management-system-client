import Viewmodel from 'client/viewmodels/viewmodel';
import userManager from 'client/managers/user-manager';
import notificationQueue from 'client/notification-queue';
import projectNavigator from 'client/navigation/project-navigator';

class AssignmentViewmodel {
  get id() { return this.model.project.id; }
  get projectName() { return this.model.project.name; }
  get roleName() { return this.model.role.name; }

  constructor(member, projectNavigator) {
    this.model = member;
    this.projectNavigator = projectNavigator;
  }

  static create(member) {
    return new AssignmentViewmodel(member, projectNavigator);
  }

  async goToProject() {
    await this.projectNavigator.viewProject(this.model.project);
  }
}

export default class HomeViewmodel extends Viewmodel {
  get assignments() { return this._assignments; }
  set assignments(value) { this._assignments = value; this.changed(); }

  get loadingAssignments() { return this._loadingAssignments; }
  set loadingAssignments(value) { this._loadingAssignments = value; this.changed(); }

  constructor(userManager, notificationQueue) {
    super();
    this.assignments = [];
    this.userManager = userManager;
    this.loadingAssignments = false;
    this.notificationQueue = notificationQueue;
  }

  static createDefault() {
    return new HomeViewmodel(userManager, notificationQueue);
  }

  onEnter(nav) {
    super.onEnter(nav);
    this.nav.clearHistory();
    this.nav.viewmodel = this;
    if (this.userManager.user.assignments) this.assignments = this.userManager.user.assignments.map(member => AssignmentViewmodel.create(member));
    this.loadAssignments();
  }

  async loadAssignments() {
    if (this.loadingAssignments) return;

    this.loadingAssignments = true;
    var response = await this.userManager.user.getProjectAssignments();
    this.loadingAssignments = false;

    if (response.isOk) {
      this.assignments = response.data.map(member => AssignmentViewmodel.create(member));
      return;
    }

    if (response.isUnauthenticated || response.isUnauthorised) return;

    if (response.noInternet) {
      this.notificationQueue.showDangerNotification('No Internet Connection');
      return;
    }

    this.notificationQueue.showDangerNotification('Something went wrong when contacting the server');
  }
}
