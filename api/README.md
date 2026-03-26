## Project setup

```bash
$ pnpm install
$ pnpm run prisma:generate
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# debug mode
$ pnpm run start:debug

# production mode
$ pnpm run start:prod
```

http://localhost:3000

## Run tests

```bash
# unit tests
$ pnpm run test

# unit tests (UI)
$ pnpm run test:ui

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Migrate database

```bash
# migrate
$ pnpm exec prisma migrate dev

# reset database
$ pnpm exec prisma migrate reset
```

## format prisma schema

```bash
pnpm run format:prisma
```

## Build docker image

```bash
docker build -t nestjs-starter:1.0 .
```

## Start docker application

```bash
docker container run -it --rm --name "nestjs-starter" -p 3000:3000 --env-file ./.env nestjs-starter:1.0
```

## Deploy prod server

```bash
docker build -f Dockerfile.deploy -t nestjs-starter-deploy:1.0 .
```

```bash
docker container run -it --rm --name "nestjs-starter-deploy" --env-file ./.env nestjs-starter-deploy:1.0
```
