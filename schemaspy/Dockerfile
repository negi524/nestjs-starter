# https://hub.docker.com/r/schemaspy/schemaspy/
FROM schemaspy/schemaspy:7.0.2

# Copy schemaspy property file
COPY ./schemaspy.properties /schemaspy.properties

# PostgreSQLのDriverをコピー
COPY ./postgresql*.jar /

# javaユーザーの/outputディレクトリに対する権限エラー回避
USER root
