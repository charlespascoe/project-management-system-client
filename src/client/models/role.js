export default class Role {
  constructor() {
    this.id = 0;
    this.name = '';
    this.permissions = [];
  }

  static create(data) {
    var role = new Role();
    role.updateAttributes(data);
    return role;
  }

  updateAttributes(data) {
    if (data.id !== undefined) this.id = data.id;
    if (data.name !== undefined) this.name = data.name;
    if (data.permissions !== undefined) this.permissions = data.permissions;
  }

  hasPermission(permission) {
    return this.permissions.find(p => p.key === permission) != null;
  }
}
