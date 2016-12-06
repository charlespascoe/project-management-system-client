import router from 'client/navigation/router';
import dialogueManager from 'client/managers/dialogue-manager';
import AddProjectMemberDialogue from 'client/views/dialogues/add-project-member-dialogue';
import ConfirmRemoveProjectMemberDialogue from 'client/views/dialogues/confirm-remove-project-member-dialogue';

export class ProjectNavigator {
  constructor(router, dialogueManager) {
    this.router = router;
    this.dialogueManager = dialogueManager;

    this.router.view('manage-project').onDoneGoBack();
  }

  async manageProject(project) {
    await this.router.navigate('manage-project', {project: project});
  }

  async showAddMemberDialogue(project) {
    await this.dialogueManager.showDialogue(AddProjectMemberDialogue, {project: project});
  }

  async showRemoveMemberDialogue(memberName, projectName) {
    return await this.dialogueManager.showDialogue(ConfirmRemoveProjectMemberDialogue, {memberName: memberName, projectName: projectName});
  }
}

export default new ProjectNavigator(router, dialogueManager);
