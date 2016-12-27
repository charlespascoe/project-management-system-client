class FakeTask {
  constructor(id, summary, desc) {
    this.id = id;
    this.summary = summary;
    this.desc = desc;
    this.state = "OPEN";
  }

  changeState(newState) {
    this.state = newState.toUpperCase();
  }
}

class FakeProject {
  constructor(id) {
    this.id = id;
    this.tasks = [];
  }

  addTask(task) {
    task.project = this;
    this.tasks.push(task);
  }

  findTask(taskId) {
    return this.tasks.find(task => task.id === taskId);
  }
}

class FakeData {
  constructor() {
    this.reset();
  }

  reset() {
    this.projects = [];

    var exampleProject = new FakeProject('EXAMPLE');
    exampleProject.addTask(new FakeTask(1, 'Example Task', 'A long(ish) description here'));

    this.projects.push(exampleProject);
  }

  clearProjects() {
    this.projects = [];
  }

  fundProject(projectId) {
    return this.projects.find(proj => proj.id === projectId);
  }
}

module.exports = new FakeData();
