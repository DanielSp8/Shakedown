export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: { "^.+\\.jsx?$": "babel-jest" },
  extensionsToTreatAsEsm: [".jsx"],
};
