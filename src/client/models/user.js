import validate from 'client/validation';
import usersApi from 'client/apis/users-api';

export default class User {
  get name() { return this.firstName + ' ' + this.otherNames; }
  get isSysadminElevated() { return this.sysadmin && this.sysadminElevationExpires && this.sysadminElevationExpires > Date.now(); }

  constructor(data, usersApi) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName || '';
    this.otherNames = data.otherNames || '';
    this.sysadmin = data.sysadmin;
    this.sysadminElevationExpires = data.sysadminElevationExpires ? new Date(data.sysadminElevationExpires) : null;
    this.usersApi = usersApi;
  }

  static create(data) {
    return new User(data, usersApi);
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
