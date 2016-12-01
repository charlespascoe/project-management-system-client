import router from 'client/navigation/router';

export class ProjectNavigator {
  constructor(router) {
    this.router = router;

    this.router.view('manage-project').onDoneGoBack();
  }

  async manageProject(project) {
    await this.router.navigate('manage-project', {project: project});
  }
}

export default new ProjectNavigator(router);
