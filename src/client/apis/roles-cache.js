import Cache from 'client/apis/cache';

export class RolesCache extends Cache {
  getId(role) {
    return role.id;
  }

  getIdFromData(roleData) {
    return roleData.id;
  }
}

export default new RolesCache();
