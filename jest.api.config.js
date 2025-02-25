const { defaults } = require("jest-config");

module.exports = {
  ...defaults,
  testEnvironment: "node",
  testMatch: ["**/__tests__/api/**/*.test.[jt]s?(x)"],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: false, // API testlerinde TSX gerekmez
          },
          target: "es2022",
        },
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};
