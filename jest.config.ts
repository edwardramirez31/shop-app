import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['!src/types/**/*.ts', 'src/**/*'],
  coveragePathIgnorePatterns: ['.*snap$', '/node_modules/', 'src/locales/'],
  coverageReporters: ['lcov', 'text', 'cobertura'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@components$': '<rootDir>/src/components',
    '^@/pages/(.*)$': '<rootDir>src/pages/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '.+\\.(css|styl|less|sass|scss|png|gif|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '^.+\\.(ts|js|tsx|jsx)$': 'babel-jest',
  },
};

export default config;
