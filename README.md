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
