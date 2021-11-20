const successResponse = (data) => {
  return {
    status: "success",
    data,
  };
};

const makeSuccessResponseGloballyAccessible = () => {
  global.successResponse = successResponse;
};

module.exports = {
  successResponse,
  makeSuccessResponseGloballyAccessible,
};
