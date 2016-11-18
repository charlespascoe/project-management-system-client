import projectsApi from 'client/apis/projects-api';
import userManager from 'client/managers/user-manager';
import {
  UnauthorisedStatus
} from 'client/apis/statuses';

export class ProjectsManager {
  constructor(projectsApi, userManager) {
    this.projectsApi = projectsApi;
    this.userManager = userManager;
    this.projects = [];
  }

  async getAllProjects() {
    var response;

    if (!this.userManager.user || !this.userManager.user.isSysadminElevated) {
      response = new Response(new UnauthorisedStatus());
    } else {
      response = await this.projectsApi.getProjects();
    }

    if (response.status instanceof UnauthorisedStatus) userManager.elevationExpired();

    if (response.isOk) this.projects = response.data;

    return response;
  }

  async createProject(data) {
    var response;

    if (!this.userManager.user || !this.userManager.user.isSysadminElevated) {
      response = new Response(new UnauthorisedStatus());
    } else {
      response = await this.projectsApi.createProject(data);
    }

    if (response.status instanceof UnauthorisedStatus) userManager.elevationExpired();

    return response;
  }
}

export default new ProjectsManager(projectsApi, userManager);
