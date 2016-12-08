import authenticationClient from 'client/auth/authentication-client';
import { defaultStatus } from 'client/apis/statuses';
import Response from 'client/apis/response';
import Role from 'client/models/role';
import roleCache from 'client/apis/role-cache';

export class RolesApi {
  constructor(client, roleCache) {
    this.client = client;
    this.roleCache = roleCache;
  }

  async getRoles() {
    var restResponse = await this.client.get('/roles/');

    var response = new Response(defaultStatus(restResponse.statusCode));

    if (response.isOk) response.data = this.roleCache.findOrCreateAll(restResponse.data, Role.create);

    return response;
  }
}

export default new RolesApi(authenticationClient, roleCache);
