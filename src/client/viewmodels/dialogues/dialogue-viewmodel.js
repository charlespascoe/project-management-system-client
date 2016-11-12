import Viewmodel from 'client/viewmodels/viewmodel';

export default class DialogueViewmodel extends Viewmodel {
  constructor() {
    super();
  }

  dismiss(result = null) {
    if (this.onDismiss) this.onDismiss(result);
  }
}
