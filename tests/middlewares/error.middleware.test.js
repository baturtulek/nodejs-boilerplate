const httpMocks = require("node-mocks-http");
const httpStatus = require("http-status");
const CONFIG = require("../../src/config");
const APIError = require("../../src/responses/classes/APIError");
const errorConverter = require("../../src/middlewares/error/errorConverter.middleware");
const errorHandler = require("../../src/middlewares/error/errorHandler.middleware");
const routeNotFound = require("../../src/middlewares/error/routeNotFound.middleware");

describe("Route Not Found", () => {
  it("Route Not Found should create exception and send to the next middleware", () => {
    const next = jest.fn();
    routeNotFound(httpMocks.createRequest(), httpMocks.createResponse(), next);
    expect(next).toHaveBeenCalledWith(expect.any(APIError));
  });
});

describe("Error Converter", () => {
  it("Error Converter should return the same object", () => {
    const apiError = new APIError(httpStatus.BAD_REQUEST, "Error-Converter-Test");
    const next = jest.fn();
    errorConverter(apiError, httpMocks.createRequest(), httpMocks.createResponse(), next);
    expect(next).toHaveBeenCalledWith(apiError);
  });

  it("Error Converter should convert an Error to APIError and include error objects Message", () => {
    const error = new Error("Error-Converter-Test");
    const next = jest.fn();
    errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);
    expect(next).toHaveBeenCalledWith(expect.any(APIError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
        data: error.message,
      })
    );
  });
  it("Error Converter should convert an Error to APIError without error objects Message", () => {
    const error = new Error();
    const next = jest.fn();
    errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next);
    expect(next).toHaveBeenCalledWith(expect.any(APIError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
        data: null,
      })
    );
  });
});

describe("Error-Handler", () => {
  let req;
  let res;
  const next = jest.fn();
  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };
    res = {
      code: null,
      data: null,
      status(status) {
        this.code = status;
        return this;
      },
      json(payload) {
        this.data = payload;
      },
    };
    next.mockClear();
  });

  it("Properly handle and send Error Response without error data", () => {
    const error = new APIError(httpStatus.BAD_REQUEST, "Error-Converter-Test");
    errorHandler(error, req, res, next);
    expect(res.data).toStrictEqual({
      status: "error",
      error: {
        code: error.statusCode,
        message: error.message,
        data: undefined,
      },
    });
  });

  it("Properly handle and send Error Response with error data", () => {
    const error = new APIError(httpStatus.BAD_REQUEST, "Error-Converter-Test", "Error-Detail");
    errorHandler(error, req, res, next);
    expect(res.data).toStrictEqual({
      status: "error",
      error: {
        code: error.statusCode,
        message: error.message,
        data: error.data,
      },
    });
  });

  it("Properly handle and send Error Response with complete error", () => {
    CONFIG.APP_CONFIG.NODE_ENV = "development";
    const error = new APIError(httpStatus.BAD_REQUEST, "Error-Converter-Test", "Error-Detail", "Error-Stack");
    errorHandler(error, req, res, next);
    expect(res.data).toStrictEqual({
      status: "error",
      error: {
        code: error.statusCode,
        message: error.message,
        data: error.data,
        stack: error.stack,
      },
    });
  });
});
