import authenticationClient from 'client/auth/authentication-client';
import { defaultStatus } from 'client/apis/statuses';
import Response from 'client/apis/response';
import Role from 'client/models/role';
import rolesCache from 'client/apis/roles-cache';

export class RolesApi {
  constructor(client, rolesCache) {
    this.client = client;
    this.rolesCache = rolesCache;
  }

  async getRoles() {
    var restResponse = await this.client.get('/roles/');

    var response = new Response(defaultStatus(restResponse.statusCode));

    if (response.isOk) response.data = this.rolesCache.findOrCreateAll(restResponse.data, Role.create);

    return response;
  }
}

export default new RolesApi(authenticationClient, rolesCache);
