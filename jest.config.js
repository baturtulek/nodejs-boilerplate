module.exports = {
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
    "node_modules/",
    "src/config/",
    "src/db/",
    "src/logger/",
    "src/routes/",
    "src/app.js",
    "src/middlewares/logger",
    "src/http",
    "src/index",
    "tests",
  ],
  collectCoverageFrom: ["src/**/*.js"],
  setupFiles: ["dotenv/config"],
  collectCoverage: true,
  notify: true,
  verbose: true,
};
