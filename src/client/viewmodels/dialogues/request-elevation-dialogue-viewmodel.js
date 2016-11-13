import DialogueViewmodel from 'client/viewmodels/dialogues/dialogue-viewmodel';
import userManager from 'client/managers/user-manager';
import {
  UnauthorisedStatus,
  UnauthenticatedStatus
} from 'client/apis/statuses';

export default class RequestElevationDialogueViewmodel extends DialogueViewmodel {
  get password() { return this._password; }
  set password(value) { this._password = value; this.errorMessage = ''; }

  get loading() { return this._loading; }
  set loading(value) { this._loading = value; this.changed(); }

  get errorMessage() { return this._errorMessage; }
  set errorMessage(value) { this._errorMessage = value; this.changed(); }

  static createDefault() {
    return new RequestElevationDialogueViewmodel(userManager);
  }

  constructor(userManager) {
    super();
    this.userManager = userManager;
    this.password = '';
    this.errorMessage = '';
    this.loading = false;
  }

  async requestElevation() {
    if (this.loading || !this.password) return;

    this.loading = true;

    var response = await this.userManager.requestElevation(this.password);

    this.password = '';
    this.loading = false;

    if (response.isOk) {
      this.dismiss();
      return;
    }

    if (response.status instanceof UnauthenticatedStatus) {
      // Token pair has expired; dismiss the dialogue in order to go to the login screen
      this.dismiss();
    } else if (response.status instanceof UnauthorisedStatus) {
      this.errorMessage = 'Incorrect password';
    } else {
      this.errorMessage = 'Something went wrong - please try again later';
    }
  }
}
