import Response from 'client/apis/response';
import usersCache from 'client/apis/users-cache';
import membersCache from 'client/apis/members-cache';
import authenticationClient from 'client/auth/authentication-client';
import {
  defaultStatus
} from 'client/apis/statuses';

export class UsersApi {
  constructor(client, usersCache, membersCache) {
    this.client = client;
    this.usersCache = usersCache;
    this.membersCache = membersCache;
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

    if (response.isOk) response.data = this.usersCache.findOrCreateAll(restResponse.data);

    return response;
  }

  async getUser(idOrEmail) {
    var restResponse = await this.client.get(`/users/${encodeURIComponent(idOrEmail)}`);

    var response = new Response(defaultStatus(restResponse.statusCode));

    if (response.isOk) response.data = this.usersCache.findOrCreate(restResponse.data);

    return response;
  }

  async getUserAssignments(idOrEmail) {
    var restResponse = await this.client.get(`/users/${encodeURIComponent(idOrEmail)}/assignments`);

    var response = new Response(defaultStatus(restResponse.statusCode));

    if (response.isOk) response.data = restResponse.data.map(data => this.membersCache.findOrCreate(data));

    return response;
  }
}

export default new UsersApi(authenticationClient, usersCache, membersCache);
