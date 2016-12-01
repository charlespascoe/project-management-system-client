import rolesApi from 'client/apis/roles-api';

export class RolesManager {
  constructor(rolesApi) {
    this.rolesApi = rolesApi;
  }

  async getRoles() {
    // Saving roles to local storage would be done here etc.
    return await this.rolesApi.getRoles();
  }
}

export default new RolesManager(rolesApi);
