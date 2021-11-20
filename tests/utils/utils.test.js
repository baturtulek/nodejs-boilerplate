const validateEnvVariables = require("../../src/utils/validateEnvVariables");

describe("Validate Env Variables", () => {
  it("Properly Validate environment variables", async () => {
    const result = validateEnvVariables();
    expect(result).toBe(true);
  });

  it("Do not provide environment variables", async () => {
    process.env = {};
    expect(validateEnvVariables).toThrow();
  });
});
