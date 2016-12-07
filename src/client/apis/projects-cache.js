export class ProjectsCache {
  constructor() {
    this.projects = {};
  }

  findOrCreate(projectData, create) {
    var project = this.projects[projectData.id];

    if (project) {
      project.updateAttributes(projectData);
      return project;
    }

    project = create(projectData);

    this.projects[project.id] = project;

    return project;
  }

  allProjects(projectsData, create) {
    var cache = {};

    var projects = projectsData.map(projectData => {
      var project = this.findOrCreate(projectData, create);
      cache[project.id] = project;
      return project;
    });

    this.projects = cache;

    return projects;
  }
}

export default new ProjectsCache();
