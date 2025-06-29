# nestjs-starter

## API

### Setup environment file

```bash
cp api/.env.sample api/.env
```

### Setup prisma

```bash
$ cd api
$ yarn prisma db pull
$ yarn run format:prisma
$ yarn prisma generate
```

### Start application

```bash
$ cd api
$ yarn start
```

```bash
yarn format:prisma
```

```bash
yarn prisma generate
```

### Start application

```bash
yarn start
```

http://localhost:3000

## DB

### Access database

```bash
$ mysql -h localhost -u root -p -D sample --protocol=tcp
Enter password:Password!

mysql>
```

### Start database

```bash
mise run dev
```
