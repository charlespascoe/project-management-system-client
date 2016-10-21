import Viewmodel from 'client/viewmodels/viewmodel';

export default class LoginViewmodel extends Viewmodel {
  get username() { return this._username; }
  set username(value) { this._username = value.trim(); this.checkValid(); this.changed(); }

  get password() { return this._password; }
  set password(value) { this._password = value; this.checkValid(); this.changed(); }

  get isValid() { return this._isValid; }
  set isValid(value) { this._isValid = value; this.changed(); }

  get loading() { return this._loading; }
  set loading(value) { this._loading = value; this.changed(); }

  constructor() {
    super();

    this.username = '';
    this.password = '';
    this.loading = false;
  }

  checkValid() {
    this.isValid = this.username != '' && this.password != '';
  }

  async login() {
    this.loading = true;

    var response = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: this.username,
        password: this.password
      })
    });

    this.loading = false;

    this.username = '';
    this.password = '';

    console.log(`OK: ${response.ok}`);
  }

  static createDefault() {

  }
}
