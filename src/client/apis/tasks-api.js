import authenticationClient from 'client/auth/authentication-client';
import tasksCache from 'client/apis/tasks-cache';
import Response from 'client/apis/response';
import { defaultStatus } from 'client/apis/statuses';

export class TasksApi {
  constructor(client, tasksCache) {
    this.client = client;
    this.tasksCache = tasksCache;
  }

  async getProjectTasks(projectId) {
    var restResponse = await this.client.get(`/projects/${projectId}/tasks/`);

    var response = new Response(defaultStatus(restResponse.statusCode));

    if (response.isOk) response.data = this.tasksCache.findOrCreateAllInProject(projectId, restResponse.data);

    return response;
  }

  async addTask(projectId, data) {
    var restResponse = await this.client.post(`/projects/${projectId}/tasks/`, data);

    return new Response(defaultStatus(restResponse.statusCode), restResponse.data);
  }
}

export default new TasksApi(authenticationClient, tasksCache);
