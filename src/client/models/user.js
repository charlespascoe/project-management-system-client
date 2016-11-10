export default class User {
  get name() { return this.firstName + ' ' + this.otherNames; }

  constructor(data) {
    this.firstName = data.firstName;
    this.otherNames = data.otherNames;
  }
}
