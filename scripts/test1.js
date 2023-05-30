const child = require('child_process');
const package = require('../package.json');

const a = {
  name: 'api',
  version: '0.0.1',
  description: '',
  author: '',
  private: true,
  license: 'UNLICENSED',
  scripts: {
    pm2: 'pm2 restart ./process.json',
    dev: 'nest start --watch',
    prebuild: 'rimraf dist',
    build: 'nest build',
    format: 'prettier --write "src/**/*.ts" "test/**/*.ts"',
    start: 'nest start',
    'start:dev': 'nest start --watch',
    'start:debug': 'nest start --debug --watch',
    'start:prod': 'node dist/main',
    lint: 'eslint "{src,apps,libs,test}/**/*.ts" --fix',
    test: 'jest',
    'test:watch': 'jest --watch',
    'test:cov': 'jest --coverage',
    'test:debug':
      'node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand',
    'test:e2e': 'jest --config ./test/jest-e2e.json',
  },
  dependencies: {
    '@nestjs/apollo': '^10.0.16',
    '@nestjs/axios': '^0.0.8',
    '@nestjs/common': '^8.0.0',
    '@nestjs/config': '^2.1.0',
    '@nestjs/core': '^8.0.0',
    '@nestjs/graphql': '^10.0.16',
    '@nestjs/jwt': '^8.0.1',
    '@nestjs/mongoose': '^9.1.1',
    '@nestjs/passport': '^8.2.2',
    '@nestjs/platform-express': '^8.0.0',
    '@types/passport-jwt': '^3.0.6',
    '@types/passport-local': '^1.0.34',
    'apollo-server': '^3.9.0',
    axios: '^0.27.2',
    bcrypt: '^5.0.1',
    'class-transformer': '^0.5.1',
    'class-validator': '^0.13.2',
    crypto: '^1.0.1',
    dayjs: '^1.11.7',
    'express-rate-limit': '^6.4.0',
    graphql: '^16.5.0',
    'graphql-subscriptions': '^2.0.0',
    'graphql-tools': '^8.3.0',
    helmet: '^5.1.0',
    lodash: '^4.17.21',
    mongoose: '6.2.4',
    'mongoose-autopopulate': '^0.16.1',
    'mongoose-delete': '^0.5.4',
    'mongoose-paginate-v2': '^1.6.3',
    passport: '^0.6.0',
    'passport-jwt': '^4.0.0',
    'passport-local': '^1.0.0',
    qiniu: '^7.7.0',
    'query-string': '^7.1.1',
    'reflect-metadata': '^0.1.13',
    rimraf: '^3.0.2',
    rxjs: '^7.2.0',
    'ts-morph': '^15.1.0',
  },
  devDependencies: {
    '@nestjs/cli': '^8.0.0',
    '@nestjs/schematics': '^8.0.0',
    '@nestjs/testing': '^8.0.0',
    '@types/express': '^4.17.13',
    '@types/jest': '27.5.0',
    '@types/node': '^16.0.0',
    '@types/supertest': '^2.0.11',
    '@typescript-eslint/eslint-plugin': '^5.0.0',
    '@typescript-eslint/parser': '^5.0.0',
    eslint: '^8.0.1',
    'eslint-config-prettier': '^8.3.0',
    'eslint-plugin-prettier': '^4.0.0',
    jest: '28.0.3',
    prettier: '^2.3.2',
    'source-map-support': '^0.5.20',
    supertest: '^6.1.3',
    'ts-jest': '28.0.1',
    'ts-loader': '^9.2.3',
    'ts-node': '^10.0.0',
    'tsconfig-paths': '4.0.0',
    typescript: '^4.3.5',
  },
  jest: {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
  },
};

const dependencies = Object.keys(a.dependencies).filter(
  (key) => !package.dependencies[key],
);

const devDependencies = Object.keys(a.devDependencies).filter(
  (key) => !package.devDependencies[key],
);

console.log('dependencies');
console.log(dependencies);

console.log('devDependencies');
console.log(devDependencies);

const sh = `

pnpm i -S ${dependencies.join(' ')}

pnpm i -D ${devDependencies.join(' ')}

`;

child.exec(sh, function (err, sto) {
  if (err) {
    console.log(err);
  }
  console.log(sto);
});