import validate from 'client/validation';

export default class Project {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }
}

Project.schema = {
  id: {
    validate: (val) => validate(val).isString().matches(/^[A-Z]{1,16}$/).isValid()
  },
  name: {
    validate: (val) => validate(val).isString().minLength(1).maxLength(64).isValid()
  }
};
