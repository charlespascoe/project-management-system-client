import validate from 'client/validation';
import projectsCache from 'client/apis/projects-cache';
import usersCache from 'client/apis/users-cache';
import moment from 'moment';
import DurationParser from 'client/duration-parser';

export default class Task {
  constructor(projectsCache, usersCache) {
    this.projectsCache = projectsCache;
    this.usersCache = usersCache;
  }

  static create(data) {
    var task = new Task(projectsCache, usersCache);
    task.updateAttributes(data);
    return task;
  }

  updateAttributes(data) {
    if (data.project !== undefined) this.project = this.projectsCache.findOrCreate(data.project);
    if (data.id !== undefined) this.id = data.id;
    if (data.summary !== undefined) this.summary = data.summary;
    if (data.priority !== undefined) this.priority = data.priority;
    if (data.assignee !== undefined) this.assignee = data.assignee ? this.usersCache.findOrCreate(data.assignee) : null;
    if (data.description !== undefined) this.description = data.description;
  }
}

Task.schema = {
  summary: {
    validate: (val) => validate(val).isString().minLength(1).maxLength(256).isValid()
  },
  priority: {
    validate: (val) => validate(val).isNumber().min(1).max(5).isValid()
  },
  estimatedEffort: {
    parse: (val) => DurationParser.parse(val),
    validate: (val) => Task.schema.estimatedEffort.parse(val) != null
  },
  targetCompletionDate: {
    parse: (val) => moment(val, 'DD/MM/YYYY', true),
    validate: (val) => Task.schema.targetCompletionDate.parse(val).isValid()
  },
  description: {
    validate: (val) => validate(val).optional().isString().minLength(1).maxLength(65536).isValid()
  }
};
