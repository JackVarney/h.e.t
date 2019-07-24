const BaseModel = require('../../shared/base.model');
const { object, string } = require('../../shared/joi');

class UserUpdateModel extends BaseModel {
  constructor() {
    const schema = object().keys({
      email: string()
        .email()
        .required(),
      givenName: string().required(),
      familyName: string().required()
    });

    super(schema);
  }
}

module.exports = UserUpdateModel;
