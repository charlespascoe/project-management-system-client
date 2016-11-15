import Viewmodel from 'client/viewmodels/viewmodel';
import usersManager from 'client/managers/users-manager';
import User from 'client/models/user';

export default class AddUserDialogueViewmodel extends Viewmodel {
  get firstName() { return this._firstName; }
  set firstName(value) {
    this._firstName = value;
    this.firstNameVaild = true;
    this.changed();
  }

  get firstNameVaild() { return this._firstNameValid; }
  set firstNameVaild(value) { this._firstNameValid = value; this.changed(); }

  get otherNames() { return this._otherNames; }
  set otherNames(value) {
    this._otherNames = value;
    this.otherNamesVaild = true;
    this.changed();
  }

  get otherNamesVaild() { return this._otherNamesValid; }
  set otherNamesVaild(value) { this._otherNamesValid = value; this.changed(); }

  get email() { return this._email; }
  set email(value) {
    this._email = value;
    this.emailVaild = true;
    this.changed();
  }

  get emailVaild() { return this._emailValid; }
  set emailVaild(value) { this._emailValid = value; this.changed(); }

  get allValid() {
    return (
      User.schema.firstName.validate(this.firstName) &&
      User.schema.otherNames.validate(this.otherNames) &&
      User.schema.email.validate(this.email)
    );
  }

  constructor(usersManager) {
    super();
    this.usersManager = usersManager;
    this.firstName = '';
    this.otherNames = '';
    this.email = '';
  }

  static createDefault() {
    return new AddUserDialogueViewmodel(usersManager);
  }

  firstNameEntered() {
    this.firstNameVaild = User.schema.firstName.validate(this.firstName);
  }

  otherNamesEntered() {
    this.otherNamesVaild = User.schema.otherNames.validate(this.otherNames);
  }

  emailEntered() {
    this.emailVaild = User.schema.email.validate(this.email);
  }

  async addUser() {
    if (!this.allValid) return;

    var response = await this.usersManager.addUser({
      email: this.email.toLowerCase(),
      firstName: this.firstName,
      otherNames: this.otherNames
    });

    if (!response.isOk) {

    }
  }

}
