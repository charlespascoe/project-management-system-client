import Response from 'client/apis/response';
import User from 'client/models/user';
import authenticationClient from 'client/auth/authentication-client';
import {
  defaultStatus
} from 'client/apis/statuses';

export class UsersApi {
  constructor(client) {
    this.client = client;
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

    if (response.isOk) response.data = restResponse.data.map(item => new User(item));

    return response;
  }

  async getUser(idOrEmail) {
    var restResponse = await this.client.get(`/users/${encodeURIComponent(idOrEmail)}`);

    var response = new Response(defaultStatus(restResponse.statusCode));

    if (response.isOk) response.data = new User(restResponse.data);

    return response;
  }
}

export default new UsersApi(authenticationClient);
