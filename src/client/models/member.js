import membersApi from 'client/apis/members-api';
import usersCache from 'client/apis/users-cache';
import projectsCache from 'client/apis/projects-cache';
import rolesCache from 'client/apis/roles-cache';
import User from 'client/models/user';
import Project from 'client/models/project';
import Role from 'client/models/role';

export default class Member {
  get name() { return this.user.firstName + ' ' + this.user.otherNames; }

  constructor(membersApi, usersCache, projectsCache, rolesCache) {
    this.membersApi = membersApi;
    this.usersCache = usersCache;
    this.projectsCache = projectsCache;
    this.rolesCache = rolesCache;
    this.user = null;
    this.role = null;
    this.project = null;
  }

  static create(data) {
    var member = new Member(membersApi, usersCache, projectsCache, rolesCache);
    member.updateAttributes(data);
    return member;
  }

  updateAttributes(data) {
    if (data.user !== undefined) this.user = this.usersCache.findOrCreate(data.user, User.create);
    if (data.project !== undefined) this.project = this.projectsCache.findOrCreate(data.project, Project.create);
    if (data.role !== undefined) this.role = this.rolesCache.findOrCreate(data.role, Role.create);
  }

  async updateMemberRole(roleId) {
    var response = await this.membersApi.updateMemberRole(this.project.id, this.user.id, roleId);

    if (response.isOk) this.role = this.rolesCache.findOrCreate({id: roleId});

    return response;
  }

  async remove() {
    return await this.membersApi.removeMember(this.project.id, this.user.id);
  }
}
