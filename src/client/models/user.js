import validate from 'client/validation';
import usersApi from 'client/apis/users-api';

export default class User {
  get name() { return this.firstName + ' ' + this.otherNames; }
  get isSysadminElevated() { return this.sysadmin && this.sysadminElevationExpires && this.sysadminElevationExpires > Date.now(); }

  constructor(usersApi) {
    this.id = 0;
    this.email = '';
    this.firstName = '';
    this.otherNames = '';
    this.sysadmin = false;
    this.sysadminElevationExpires = null;
    this.usersApi = usersApi;
  }

  static create(data) {
    var user = new User(usersApi);
    user.updateAttributes(data);
    return user;
  }

  updateAttributes(data) {
    if (data.id !== undefined) this.id = data.id;
    if (data.firstName !== undefined) this.firstName = data.firstName;
    if (data.otherNames !== undefined) this.otherNames = data.otherNames;
    if (data.email !== undefined) this.email = data.email;
    if (data.sysadmin !== undefined) this.sysadmin = data.sysadmin;
    if (data.sysadminElevationExpires !== undefined) this.sysadminElevationExpires = data.sysadminElevationExpires ? new Date(data.sysadminElevationExpires) : null;
  }

  async getProjectAssignments() {
    return this.usersApi.getUserAssignments(this.id);
  }
}

User.schema = {
  email: {
    validate: (val) => validate(val).isString().isProbablyEmail().isValid()
  },
  firstName: {
    validate: (val) => validate(val).isString().minLength(1).maxLength(64).isValid()
  },
  otherNames: {
    validate: (val) => validate(val).isString().minLength(1).maxLength(128).isValid()
  }
};
