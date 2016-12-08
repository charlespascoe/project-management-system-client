import authClient from 'client/auth/authentication-client';
import { defaultStatus } from 'client/apis/statuses';
import Response from 'client/apis/response';
import Project from 'client/models/project';
import projectsCache from 'client/apis/projects-cache';

export class ProjectsApi {
  constructor(client, projectsCache) {
    this.client = client;
    this.projectsCache = projectsCache;
  }

  async getProjects() {
    var restResponse = await this.client.get('/projects/');

    var response = new Response(defaultStatus(restResponse.statusCode));

    if (response.isOk) response.data = this.projectsCache.findOrCreateAll(restResponse.data, Project.create);

    return response;
  }

  async createProject(data) {
    var restResponse = await this.client.post('/projects/', data);

    return new Response(defaultStatus(restResponse.statusCode));
  }
}

export default new ProjectsApi(authClient, projectsCache);
