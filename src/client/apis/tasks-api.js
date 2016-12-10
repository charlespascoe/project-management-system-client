import authenticationClient from 'client/auth/authentication-client';
import tasksCache from 'client/apis/tasks-cache';
import Response from 'client/apis/response';
import { defaultStatus } from 'client/apis/statuses';

export class TasksApi {
  constructor(client, tasksCache) {
    this.client = client;
    this.tasksCache = tasksCache;
  }

  async getProjectTasks() {

  }

  async addTask(projectId, data) {
    var restResponse = await this.client.post(`/projects/${projectId}/tasks/`, data);

    return new Response(defaultStatus(restResponse.statusCode), restResponse.data);
  }
}

export default new TasksApi(authenticationClient, tasksCache);
