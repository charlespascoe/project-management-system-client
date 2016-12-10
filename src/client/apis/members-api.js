import Response from 'client/apis/response';
import authenticationClient from 'client/auth/authentication-client';
import membersCache from 'client/apis/members-cache';
import {
  defaultStatus
} from 'client/apis/statuses';

export class MembersApi {
  constructor(client, membersCache) {
    this.client = client;
    this.membersCache = membersCache;
  }

  async getProjectMembers(projectId) {
    var restResponse = await this.client.get(`/projects/${projectId}/members/`);

    var response = new Response(defaultStatus(restResponse.statusCode));

    if (response.isOk) response.data = this.membersCache.findOrCreateAllInProject(projectId, restResponse.data);

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
    var restResponse = await this.client.post(`/projects/${projectId}/members/`, {userId: userId, roleId: roleId});

    return new Response(defaultStatus(restResponse.statusCode));
  }

  async updateMemberRole(projectId, userId, roleId) {
    var restResponse = await this.client.put(`/projects/${projectId}/members/${userId}`, {roleId: roleId});

    return new Response(defaultStatus(restResponse.statusCode));
  }

  async removeMember(projectId, userId) {
    var restResponse = await this.client.delete(`/projects/${projectId}/members/${userId}`);

    return new Response(defaultStatus(restResponse.statusCode));
  }
}

export default new MembersApi(authenticationClient, membersCache);
