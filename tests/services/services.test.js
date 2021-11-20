const { bcryptService, tokenService } = require("../../src/services");

describe("Bcrypt Service", () => {
  it("Hash Password", async () => {
    const password = "12345";
    const hashedPassword = await bcryptService.hashPassword(password);
    expect(hashedPassword).toHaveLength(60);
  });

  it("Compare passwords", async () => {
    const password = "12345";
    const hashedPassword = "$2a$10$gtgDpW8G2Cyu52JnXkPokecvPTcuavkPJLnlpAypg.KAp5HqBUbeq";
    const result = await bcryptService.comparePasswords(password, hashedPassword);
    expect(result).toBe(true);
  });
});

describe("Token Service", () => {
  let accessToken;
  it("Properly Generate Access Token", async () => {
    const userId = 1;
    accessToken = await tokenService.generateAccessToken(userId);
    expect(accessToken).toStrictEqual(expect.any(String));
  });

  it("Validate Access Token", async () => {
    const result = await tokenService.validateAccessToken(accessToken);
    expect(result.uid).toBe(1);
  });
});
