import router from 'client/navigation/router';
import Project from 'client/models/project';
import Task from 'client/models/task';

export class TaskNavigator {
  constructor(router) {
    this.router = router;

    this.router.view('edit-task').onEnter(async (viewId, currentNav, navData) => {
      if (navData && (navData.task instanceof Task || navData.project instanceof Project)) {
        this.router.goToView(viewId, navData);
      } else {
        console.warn('Invalid navData when trying to navigate to edit-task:', navData);
      }
    }).onDone(async (currentNav, navData) => {
      if (navData && navData.task instanceof Task) {
        await this.viewTask(navData.task);
      } else {
        this.router.back();
      }
    });
  }

  async addTask(project) {
    await this.router.navigate('edit-task', {project: project});
  }

  async editTask(task) {
    await this.router.navigate('edit-task', {task: task});
  }

  async viewTask(task) {
    await this.router.navigate('view-task', {task: task});
  }
}

export default new TaskNavigator(router);
