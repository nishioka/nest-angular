module.exports = {
  displayName: 'api-e2e',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageDirectory: '../../coverage/apps/api-e2e',
  testEnvironment: 'node',
  testTimeout: 50000,
};
