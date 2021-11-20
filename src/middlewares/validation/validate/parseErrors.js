const parseErrors = (validationErrors) => {
  const errors = [];
  validationErrors.forEach((error) => {
    errors.push({
      param: error.params.missingProperty ?? error.instancePath.substring(1),
      key: error.keyword,
      message: error.message,
      property: (function () {
        return error.keyword === "minimum" ? error.dataPath : undefined;
      })(),
    });
  });
  return errors;
};

module.exports = parseErrors;
