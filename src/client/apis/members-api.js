import Response from 'client/apis/response';
import Member from 'client/models/member';
import authenticationClient from 'client/auth/authentication-client';
import {
  defaultStatus
} from 'client/apis/statuses';

export class MembersApi {
  constructor(client) {
    this.client = client;
  }

  async getProjectMembers(projectId) {
    var restResponse = await this.client.get(`/projects/${projectId}/members/`);

    var response = new Response(defaultStatus(restResponse.statusCode));

    if (response.isOk) response.data = restResponse.data.map(data => Member.create(data));

    return response;
  }

  async getProjectNonMembers(projectId) {
    var restResponse = await this.client.get(`/projects/${projectId}/non-members/`);

    return new Response(defaultStatus(restResponse.statusCode), restResponse.data);
  }

  async removeMember(projectId, userId) {
    var restResponse = await this.client.delete(`/projects/${projectId}/members/${userId}`);

    return new Response(defaultStatus(restResponse.statusCode));
  }

  async getProjectMemberDetails(projectId, userId) {
    var restResponse = await this.client.get(`/projects/${projectId}/members/${userId}`);

    //TODO: Implement
  }

  async addMember(projectId, userId, roleId) {
    var restResponse = await this.client.post(`/project/${projectId}/members/${userId}`, {roleId: roleId});

    return new Response(defaultStatus(restResponse.statusCode));
  }

  async updateMemberRole(projectId, userId, roleId) {
    var restResponse = await this.client.put(`/project/${projectId}/members/${userId}`, {roleId: roleId});

    return new Response(defaultStatus(restResponse.statusCode));
  }
}

export default new MembersApi(authenticationClient);
