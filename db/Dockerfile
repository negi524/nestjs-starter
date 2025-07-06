# 開発環境
FROM postgres:17-alpine AS development

# Copy setting file
COPY ./conf/postgresql.conf /etc/postgresql/postgresql.conf

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]

EXPOSE 5432

# 本番環境
FROM postgres:17-alpine AS production

# Copy setting file
COPY ./conf/postgresql.conf /etc/postgresql/postgresql.conf

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]

EXPOSE 5432
