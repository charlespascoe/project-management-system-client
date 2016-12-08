import rolesApi from 'client/apis/roles-api';

export class RolesManager {
  constructor(rolesApi) {
    this.rolesApi = rolesApi;
    this.roles = null;
  }

  // Saving roles to local storage would be done here etc.
  async getRoles(forceRefresh = false) {
    var response = await this.rolesApi.getRoles();

    if (response.isOk) this.roles = response.data;

    return response;
  }
}

export default new RolesManager(rolesApi);
