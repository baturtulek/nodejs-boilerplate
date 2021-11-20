const httpStatus = require("http-status");
const supertest = require("supertest");
const app = require("../../src/app");
const request = supertest(app);
const initializeAPI = require("../../src/initializeAPI");

beforeAll(async () => {
  await initializeAPI();
});

describe("User Tests", () => {
  it("Register User", async () => {
    const res = await request.post("/v1/user").send({
      username: "TEST_USER",
      firstName: "TEST",
      lastName: "TEST",
      password: "test",
      email: "test@test.com",
    });
    expect(res.statusCode).toEqual(httpStatus.CREATED);
  });

  it("Register User - With Already registered E-Mail address", async () => {
    const res = await request.post("/v1/user").send({
      username: "TEST_USER",
      firstName: "TEST",
      lastName: "TEST",
      password: "test",
      email: "test@test.com",
    });
    expect(res.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });
});

describe("Auth Tests", () => {
  it("Login user", async () => {
    const res = await request.post("/v1/auth/login").send({
      username: "TEST_USER",
      password: "test",
    });
    expect(res.statusCode).toEqual(httpStatus.OK);
  });

  it("Login user - Wrong Username", async () => {
    const res = await request.post("/v1/auth/login").send({
      username: "TEST_USER_wrong",
      password: "test",
    });
    expect(res.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("Login user - Wrong Password", async () => {
    const res = await request.post("/v1/auth/login").send({
      username: "TEST_USER",
      password: "test_wrong",
    });
    expect(res.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });
});

describe("System Tests", () => {
  it("System Health Check", async () => {
    const res = await request.get("/v1/system/healthcheck").send();
    expect(res.statusCode).toEqual(httpStatus.OK);
  });
});
