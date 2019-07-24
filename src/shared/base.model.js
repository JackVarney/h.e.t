const { validate } = require('../shared/joi');

class BaseModel {
  constructor(schema) {
    this.schema = schema;

    this.validate = this.validate.bind(this);
    this.useAsExpressMiddleware = this.useAsExpressMiddleware.bind(this);
  }

  validate(data) {
    return validate(data, this.schema);
  }

  useAsExpressMiddleware(req, res, next) {
    const validationResult = this.validate(req.body);

    if (validationResult.error) {
      res.status(400).json({
        title: 'Bad Request',
        message: validationResult.error.details[0].message
      });
    } else {
      next();
    }
  }
}

module.exports = BaseModel;
