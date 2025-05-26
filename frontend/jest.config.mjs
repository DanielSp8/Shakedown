export default {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/index.js", "!/__mocks__/**"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  extensionsToTreatAsEsm: [".jsx"],
  moduleNameMapper: {
    "\\.(css|scss|sass|less)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
