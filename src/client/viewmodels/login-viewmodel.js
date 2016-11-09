import Viewmodel from 'client/viewmodels/viewmodel';
import authenticatedClient from 'client/apis/authenticated-client';
import {
  SuccessStatus,
  UnauthenticatedStatus
} from 'client/apis/statuses';

export default class LoginViewmodel extends Viewmodel {
  get username() { return this._username; }
  set username(value) {
    this._username = value.trim();
    this.checkValid();
    this.errorMessage = '';
    this.changed();
  }

  get password() { return this._password; }
  set password(value) {
    this._password = value;
    this.checkValid();
    this.errorMessage = '';
    this.changed();
  }

  get isValid() { return this._isValid; }
  set isValid(value) { this._isValid = value; this.changed(); }

  get loading() { return this._loading; }
  set loading(value) { this._loading = value; this.changed(); }

  get errorMessage() { return this._errorMessage; }
  set errorMessage(value) { this._errorMessage = value; }

  constructor(authClient) {
    super();

    this.username = '';
    this.password = '';
    this.errorMessage = '';
    this.loading = false;
    this.authClient = authClient;
  }

  checkValid() {
    this.isValid = this.username != '' && this.password != '';
  }

  async login() {
    this.loading = true;

    var response = await this.authClient.login(this.username, this.password);

    if (response.status instanceof SuccessStatus) {
      // Navigate
      console.log('Successful login!');
      return;
    }

    this.username = '';
    this.password = '';

    console.log(response);

    if (response.status instanceof UnauthenticatedStatus) {
      this.errorMessage = 'Incorrect username or password';
    } else {
      this.errorMessage = 'Something went wrong - please try again later';
    }

    this.loading = false;
  }

  static createDefault() {
    return new LoginViewmodel(authenticatedClient);
  }
}
