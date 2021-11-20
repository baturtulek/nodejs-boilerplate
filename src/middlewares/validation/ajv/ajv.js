const Ajv = require("ajv").default;
const addFormats = require("ajv-formats");

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  strict: true,
  coerceTypes: true,
});

addFormats(ajv);

module.exports = ajv;
