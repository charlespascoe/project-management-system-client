export default class User {
  get name() { return this.firstName + ' ' + this.otherNames; }
  get isSysadminElevated() { return this.sysadmin && this.sysadminElevationExpires && this.sysadminElevationExpires > Date.now(); }

  constructor(data) {
    this.firstName = data.firstName || '';
    this.otherNames = data.otherNames || '';
    this.sysadmin = data.sysadmin;
    this.sysadminElevationExpires = data.sysadminElevationExpires ? new Date(data.sysadminElevationExpires) : null;
  }
}
