## Project setup

```bash
$ yarn install
$ yarn prisma generate
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

http://localhost:3000

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Migrate database

```bash
# migrate
$ prisma migrate dev

# prepare test data
$ prisma db seed

# reset database and prepare test data
$ prisma migrate reset
```

## format prisma schema

```bash
yarn format:prisma
```
