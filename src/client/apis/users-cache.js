import Cache from 'client/apis/cache';

export class UsersCache extends Cache {
  getId(user) {
    return user.id;
  }

  getIdFromData(userData) {
    return userData.id;
  }
}

export default new UsersCache();
