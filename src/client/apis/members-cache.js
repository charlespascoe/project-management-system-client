export class MembersCache {
  constructor() {
    this.cache = {};
  }

  findOrCreate(data) {
    var project = this.cache[data.project.id];

    if (project == undefined) {
      project = {};
      this.cache[data.project.id] = project;
    }

    var member = project[data.user.id];

    if (member) {
      member.updateAttributes(data);
      return member;
    }

    member = this.create(data);

    project[member.user.id] = member;

    return member;
  }

  findOrCreateAllInProject(projectId, dataSet) {
    var projectCache = this.cache[projectId],
        newProjectCache = {};

    if (projectCache == undefined) {
      // Cache doesn't exist
      this.cache[projectId] = newProjectCache;

      return dataSet.map(data => {
        var member = this.create(data);
        newProjectCache[member.user.id] = member;
        return member;
      });
    }

    var members = dataSet.map(data => {
      var member = projectCache[data.user.id];

      if (member) {
        member.updateAttributes(data);
      } else {
        member = this.create(data);
      }

      newProjectCache[member.user.id] = member;
      return member;
    });

    this.cache[projectId] = newProjectCache;

    return members;
  }
}

export default new MembersCache();
