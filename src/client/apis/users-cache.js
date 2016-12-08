export class UsersCache {
  constructor() {
    this.users = {};
  }

  findOrCreate(userData, create) {
    var user = this.users[userData.id];

    if (user) {
      user.updateAttributes(userData);
      return user;
    }

    user = create(userData);

    this.users[user.id] = user;

    return user;
  }

  allUsers(usersData, create) {
    var cache = {};

    var users = usersData.map(userData => {
      var user = this.findOrCreate(userData, create);
      cache[user.id] = user;
      return user;
    });

    this.users = cache;

    return users;
  }
}

export default new UsersCache();
