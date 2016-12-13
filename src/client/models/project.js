import validate from 'client/validation';
import userManager from 'client/managers/user-manager';
import projectsApi from 'client/apis/projects-api';
import Response from 'client/apis/response';
import membersApi from 'client/apis/members-api';
import tasksApi from 'client/apis/tasks-api';
import {
  SuccessStatus,
  BadRequestStatus,
  UnauthorisedStatus
} from 'client/apis/statuses';

export default class Project {
  constructor(userManager, projectsApi, membersApi, tasksApi) {
    this._userManager = userManager;
    this._projectsApi = projectsApi;
    this._membersApi = membersApi;
    this.tasksApi = tasksApi;
    this.id = '';
    this.name = '';
    this.iconUrl = '';
    this.members = null;
    this.tasks = null;
  }

  static create(data) {
    var project = new Project(userManager, projectsApi, membersApi, tasksApi);
    project.updateAttributes(data);
    return project;
  }

  updateAttributes(data) {
    if (data.id != undefined) this.id = data.id;
    if (data.name != undefined) this.name = data.name;
    if (data.iconUrl != undefined) this.iconUrl = data.iconUrl;
  }

  async getMembers() {
    var response = await this._membersApi.getProjectMembers(this.id);

    if (response.isOk) this.members = response.data;

    return response;
  }

  async getNonMembers() {
    return await this._membersApi.getProjectNonMembers(this.id);
  }

  async addMember(userId, roleId) {
    return await this._membersApi.addMember(this.id, userId, roleId);
  }

  async addTask(data) {
    return this.tasksApi.addTask(this.id, data);
  }

  async getTasks() {
    var response = await this.tasksApi.getProjectTasks(this.id);

    if (response.isOk) this.tasks = response.data;

    return response;
  }
}

Project.schema = {
  id: {
    validate: (val) => validate(val).isString().matches(/^[A-Z]{1,16}$/).isValid()
  },
  name: {
    validate: (val) => validate(val).isString().minLength(1).maxLength(64).isValid()
  },
  iconUrl: {
    validate: (val) => validate(val).isString().minLength(1).maxLength(256).isValid()
  }
};
