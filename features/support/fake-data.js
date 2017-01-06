class FakeTask {
  constructor(id, summary, desc) {
    this.id = id;
    this.summary = summary;
    this.desc = desc;
    this.state = 'OPEN';
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

class FakeAssignment {
  constructor(user, project, role) {
    this.user = user;
    this.project = project;
    this.role = role;
  }

  serialise() {
    return {
      user: {id: this.user.id},
      project: {id: this.project.id, name: this.project.name},
      role: {id: this.role.id, name: this.role.name}
    };
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

    this.assignments = [
      new FakeAssignment({id: 1}, {id: 'EXAMPLE', name: 'Example Project'}, {id: 1, name: 'Project Administrator'})
    ];
  }

  clearProjects() {
    this.projects = [];
  }

  clearAssignments() {
    this.assignments = [];
  }

  findProject(projectId) {
    return this.projects.find(proj => proj.id === projectId);
  }
}

module.exports = new FakeData();
