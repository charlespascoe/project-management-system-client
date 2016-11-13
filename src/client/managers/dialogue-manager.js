import React from 'react';
import RequestElevationDialogue from 'client/views/dialogues/request-elevation-dialogue';

class DialogueManager {
  get currentDialogue() { return this._currentDialogue; }
  set currentDialogue(value) {
    this._currentDialogue = value;
    if (this.onDialogueChange) this.onDialogueChange();
  }

  constructor() {
    this.currentDialogue = null;
  }

  showRequestElevationDialogue() {
    if (this.currentDialogue != null) return;

    this.currentDialogue = {
      elm: RequestElevationDialogue,
      props: {
        onDismiss: this.dialogueDismissed.bind(this)
      }
    };
  }

  dialogueDismissed(result) {
    this.currentDialogue = null;
  }

  renderDialogue() {
    return this.currentDialogue ? <this.currentDialogue.elm {...this.currentDialogue.props} /> : '';
  }
}

export default new DialogueManager();
