import membersApi from 'client/apis/members-api';

export default class Member {
  get name() { return this.user.firstName + ' ' + this.user.otherNames; }

  constructor(data, membersApi) {
    this.user = data.user;
    this.role = data.role;
    this.project = data.project;
    this.membersApi = membersApi;
  }

  static create(data) {
    return new Member(data, membersApi);
  }

  async updateMemberRole(roleId) {
    var response = await this.membersApi.updateMemberRole(this.project.id, this.user.id, roleId);

    if (response.isOk) this.role = {id: roleId};

    return response;
  }

  async remove() {
    return await this.membersApi.removeMember(this.project.id, this.user.id);
  }
}
