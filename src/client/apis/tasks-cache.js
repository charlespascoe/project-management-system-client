export class TasksCache {
  constructor() {
    this.cache = {};
  }

  findOrCreate(data) {
    var project = this.cache[data.project.id];

    if (project == undefined) {
      project = {};
      this.cache[data.project.id] = project;
    }

    var task = project[data.id];

    if (task) {
      task.updateAttributes(data);
      return task;
    }

    task = this.create(data);

    project[task.id] = task;

    return task;
  }

  findOrCreateAllInProject(projectId, dataSet) {
    var projectCache = this.cache[projectId],
        newProjectCache = {};

    if (projectCache == undefined) {
      // Cache doesn't exist
      this.cache[projectId] = newProjectCache;

      return dataSet.map(data => {
        var task = this.create(data);
        newProjectCache[task.id] = task;
        return task;
      });
    }

    var tasks = dataSet.map(data => {
      var task = projectCache[data.user.id];

      if (task) {
        task.updateAttributes(data);
      } else {
        task = this.create(data);
      }

      newProjectCache[task.id] = task;
      return task;
    });

    this.cache[projectId] = newProjectCache;

    return tasks;
  }
}

export default new TasksCache();
