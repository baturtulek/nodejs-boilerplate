const ajv = require("../ajv/ajv");
const parseErrors = require("./parseErrors");
const { badRequestException } = require("../../../responses/exceptions");
const { VALIDATION_FAILED } = require("../../../responses/messages");

const validateParameters = (schemaName) => {
  return (req, res, next) => {
    const validate = ajv.getSchema(schemaName);
    const isValid = validate(req.params);
    if (!isValid) {
      return next(badRequestException(VALIDATION_FAILED, parseErrors(validate.errors)));
    }
    return next();
  };
};

module.exports = validateParameters;
