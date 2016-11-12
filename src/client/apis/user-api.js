import Response from 'client/apis/response';
import User from 'client/models/user';
import authenticationClient from 'client/auth/authentication-client';
import {
  defaultStatus
} from 'client/apis/statuses';

export class UserApi {
  constructor(client) {
    this.client = client;
  }

  async getUser(idOrEmail) {
    var restResponse = await this.client.get(`/users/${encodeURIComponent(idOrEmail)}`);

    var response = new Response(defaultStatus(restResponse.statusCode));

    if (response.isOk) response.data = new User(restResponse.data);

    return response;
  }
}

export default new UserApi(authenticationClient);
