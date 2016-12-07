import Response from 'client/apis/response';
import User from 'client/models/user';
import Member from 'client/models/member';
import Project from 'client/models/project';
import projectsCache from 'client/apis/projects-cache';
import authenticationClient from 'client/auth/authentication-client';
import {
  defaultStatus
} from 'client/apis/statuses';

export class UsersApi {
  constructor(client, projectsCache) {
    this.client = client;
    this.projectsCache = projectsCache;
  }

  async addUser(data) {
    var restResponse = await this.client.post('/users/', data);

    return new Response(defaultStatus(restResponse.statusCode), restResponse.data);
  }

  async deleteUser(id) {
    var restResponse = await this.client.delete(`/users/${id}`);

    return new Response(defaultStatus(restResponse.statusCode));
  }

  async getAllUsers() {
    var restResponse = await this.client.get('/users/');

    var response = new Response(defaultStatus(restResponse.statusCode));

    if (response.isOk) response.data = restResponse.data.map(item => User.create(item));

    return response;
  }

  async getUser(idOrEmail) {
    var restResponse = await this.client.get(`/users/${encodeURIComponent(idOrEmail)}`);

    var response = new Response(defaultStatus(restResponse.statusCode));

    if (response.isOk) response.data = User.create(restResponse.data);

    return response;
  }

  async getUserAssignments(idOrEmail) {
    var restResponse = await this.client.get(`/users/${encodeURIComponent(idOrEmail)}/assignments`);

    var response = new Response(defaultStatus(restResponse.statusCode));

    if (response.isOk) response.data = restResponse.data.map(item => Member.create({project: this.projectsCache.findOrCreate(item.project, Project.create), user: item.user, role: item.role}));

    return response;
  }
}

export default new UsersApi(authenticationClient, projectsCache);
