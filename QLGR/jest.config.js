module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/*.spec.ts',
    '**/test/**/*.e2e-spec.ts',
    '**/tests/**/*.spec.tsx',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  rootDir: '.',
};
