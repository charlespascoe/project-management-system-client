import authClient from 'client/auth/authentication-client';
import { defaultStatus } from 'client/apis/statuses';
import Response from 'client/apis/response';
import Project from 'client/models/project';

export class ProjectsApi {
  constructor(client) {
    this.client = client;
  }

  async getProjects() {
    var restResponse = await this.client.get('/projects/');

    var response = new Response(defaultStatus(restResponse.statusCode));

    if (response.isOk) response.data = restResponse.data.map(data => new Project(data));

    return response;
  }

  async createProject(data) {
    var restResponse = await this.client.post('/projects/', data);

    return new Response(defaultStatus(restResponse.statusCode));
  }
}

export default new ProjectsApi(authClient);
