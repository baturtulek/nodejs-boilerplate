const httpMocks = require("node-mocks-http");
const APIError = require("../../src/responses/classes/APIError");
const { validateBody } = require("../../src/middlewares/validation/validate");
const SCHEMAS = require("../../src/middlewares/validation/schemas");
const AJV = require("../../src/middlewares/validation/ajv/ajv");
const loadEndpointValidationSchemas = require("../../src/middlewares/validation/ajv/loadSchemas");

beforeAll(() => {
  loadEndpointValidationSchemas(AJV);
});

describe("Validation Middleware Tests", () => {
  describe("Validate incoming req body", () => {
    it("Properly Validate req.body and call next middleware", async () => {
      const req = {
        body: {
          username: "test",
          password: "12345",
        },
      };
      const next = jest.fn();
      const validateSchema = validateBody(SCHEMAS.AUTH.LOGIN_SCHEMA);
      validateSchema(req, httpMocks.createResponse(), next);
      expect(next).toHaveBeenCalled();
    });

    it("Provide invalid body. Call next middleware with error object", () => {
      const req = {
        body: {},
      };
      const next = jest.fn();
      const validateSchema = validateBody(SCHEMAS.AUTH.LOGIN_SCHEMA);
      validateSchema(req, httpMocks.createResponse(), next);
      expect(next).toHaveBeenCalledWith(expect.any(APIError));
    });
  });
});
