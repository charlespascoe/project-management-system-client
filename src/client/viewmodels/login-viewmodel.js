import Viewmodel from 'client/viewmodels/viewmodel';
import userManager from 'client/managers/user-manager';
import {
  SuccessStatus,
  UnauthenticatedStatus,
  NoInternetStatus
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

  get rememberMe() { return this._rememberMe; }
  set rememberMe(value) {
    this._rememberMe = value;
    this.changed();
  }

  constructor(userManager) {
    super();

    this.username = '';
    this.password = '';
    this.errorMessage = '';
    this.loading = false;
    this.rememberMe = false;
    this.userManager = userManager;
  }

  checkValid() {
    this.isValid = this.username != '' && this.password != '';
  }

  async login() {
    if (!this.isValid || this.loading) return;

    this.loading = true;

    var response = await this.userManager.login(this.username, this.password, this.rememberMe);

    if (response.isOk) {
      await this.done();
      return;
    }

    this.username = '';
    this.password = '';

    if (response.status instanceof UnauthenticatedStatus) {
      this.errorMessage = 'Incorrect username or password';
    } else if (response.status instanceof NoInternetStatus) {
      this.errorMessage = 'No Internet Connection';
    } else {
      this.errorMessage = 'Something went wrong - please try again later';
    }

    this.loading = false;
  }

  static createDefault() {
    return new LoginViewmodel(userManager);
  }
}
