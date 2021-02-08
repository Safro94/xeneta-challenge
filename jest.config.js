module.exports = {
  moduleDirectories: ['node_modules', 'utils'],
  setupFiles: ['@testing-library/react/dont-cleanup-after-each'],
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  coverageReporters: ['lcov'],
  coverageDirectory: 'report',
  testPathIgnorePatterns: ['./node_modules/'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/__test__/**',
    '!**/__tests__/**',
  ],
  moduleNameMapper: {
    '^./index.module': 'identity-obj-proxy',
  },
};
