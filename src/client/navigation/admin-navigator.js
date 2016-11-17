import router from 'client/navigation/router';
import AddUserDialogue from 'client/views/dialogues/admin/add-user-dialogue';
import ConfirmDeleteUserDialogue from 'client/views/dialogues/admin/confirm-delete-user-dialogue';
import dialogueManager from 'client/managers/dialogue-manager';

class AdminNavigator {
  constructor(router, dialogueManager) {
    this.router = router;
    this.dialogueManager = dialogueManager;

    this.router.view('admin').onDoneGoTo('home');
  }

  async showAddUserDialogue() {
    await this.dialogueManager.showDialogue(AddUserDialogue);
  }

  async showConfirmDeleteUser(name) {
    return await this.dialogueManager.showDialogue(ConfirmDeleteUserDialogue, {name: name});
  }

  async goToAdmin() {
    this.router.navigate('admin');
  }
}

export default new AdminNavigator(router, dialogueManager);
