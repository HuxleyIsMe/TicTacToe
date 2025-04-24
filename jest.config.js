export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }],
  },
  extensionsToTreatAsEsm: [".ts"],
};
