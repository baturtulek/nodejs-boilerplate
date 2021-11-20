const httpMocks = require("node-mocks-http");
const APIError = require("../../src/responses/classes/APIError");
const { tokenService } = require("../../src/services");
const tokenValidation = require("../../src/middlewares/auth/tokenValidation.midlleware");

describe("Auth Middlewares", () => {
  it("Properly Validate Access Token", async () => {
    const userId = 1;
    const accessToken = await tokenService.generateAccessToken(userId);
    const req = {
      params: {},
      body: {},
      headers: { authorization: `Bearer ${accessToken}` },
    };
    const next = jest.fn();
    await tokenValidation(req, httpMocks.createResponse(), next);
    expect(next).toHaveBeenCalledWith();
  });

  it("Do not provide Access Token to req object. Call next middleware with error object", async () => {
    const req = {
      params: {},
      body: {},
      headers: {},
    };
    const next = jest.fn();
    await tokenValidation(req, httpMocks.createResponse(), next);
    expect(next).toHaveBeenCalledWith(expect.any(APIError));
  });

  it("Provide invalid Access Token to req object. Call next middleware with error object", async () => {
    const req = {
      params: {},
      body: {},
      headers: { authorization: "Bearer invalid_token" },
    };
    const next = jest.fn();
    await tokenValidation(req, httpMocks.createResponse(), next);
    expect(next).toHaveBeenCalledWith(expect.any(APIError));
  });
});
