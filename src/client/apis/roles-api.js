import authenticationClient from 'client/auth/authentication-client';
import { defaultStatus } from 'client/apis/statuses';
import Response from 'client/apis/response';

export class RolesApi {
  constructor(client) {
    this.client = client;
  }

  async getRoles() {
    var restResponse = await this.client.get('/roles/');

    return new Response(defaultStatus(restResponse.statusCode), restResponse.data);
  }
}

export default new RolesApi(authenticationClient);
