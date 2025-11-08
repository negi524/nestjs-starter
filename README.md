# nestjs-starter

## Setup environment file

```bash
cp api/.env.sample api/.env
```

## API

[README.md](./api/README.md)

## DB

### Access database

```bash
psql 'postgresql://postgres:Password!@localhost:5432/sample?connect_timeout=10'
```

### Start database

```bash
mise run dev
```

## Architecture

```mermaid
architecture-beta
    group system(cloud)[System]

    service user(internet)[User]
    service be(server)[BE NestJS] in system
    service db(database)[DB PostgreSQL] in system

    user:R --> L:be
    be:R --> L:db
```
