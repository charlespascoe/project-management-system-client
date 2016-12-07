import validate from 'client/validation';
import userManager from 'client/managers/user-manager';
import projectsApi from 'client/apis/projects-api';
import Response from 'client/apis/response';
import membersApi from 'client/apis/members-api';
import {
  SuccessStatus,
  BadRequestStatus,
  UnauthorisedStatus
} from 'client/apis/statuses';

export default class Project {
  constructor(userManager, projectsApi, membersApi) {
    this._userManager = userManager;
    this._projectsApi = projectsApi;
    this._membersApi = membersApi;
    this.id = '';
    this.name = '';
    this.iconUrl = '';
    this.members = null;
  }

  static create(data) {
    var project = new Project(userManager, projectsApi, membersApi);
    project.updateAttributes(data);
    return project;
  }

  updateAttributes(data) {
    if (data.id != undefined) this.id = data.id;
    if (data.name != undefined) this.name = data.name;
    if (data.iconUrl != undefined) this.iconUrl = data.iconUrl;
  }

  async getMembers(forceRefresh = false) {
    if (this.members && !forceRefresh) return new Response(new SuccessStatus(), this.members);

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
