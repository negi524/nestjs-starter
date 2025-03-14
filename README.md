# nestjs-starter

## API

### Setup environment file

```bash
$ cp api/.env.sample api/.env
```

### Setup prisma

```bash
$ docker compose exec api yarn prisma db pull
$ docker compose exec api yarn run format:prisma
$ docker compose exec api yarn prisma generate
```

## DB

### Access database

```bash
$ mysql -h localhost -u root -p -D sample --protocol=tcp
Enter password:Password!

mysql>
```
