import Cache from 'client/apis/cache';

export class ProjectsCache extends Cache {
  getId(project) {
    return project.id;
  }

  getIdFromData(projectData) {
    return projectData.id;
  }
}

export default new ProjectsCache();
