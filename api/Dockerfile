# ビルド用イメージ
# Use the official Node.js image as the base image
FROM node:22 AS builder

# ARG DATABASE_URL
# ENV DATABASE_URL=${DATABASE_URL}

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the rest of the application files
COPY . .

# Install the application dependencies
RUN corepack enable && \
  yarn install --immutable

RUN yarn build


# 実行用イメージ
# TODO: alpine
FROM node:22

WORKDIR /usr/src/app

# ビルドの成果物のみコピー
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/yarn.lock ./yarn.lock
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/generated ./generated

RUN corepack enable

# Expose the application port
EXPOSE 3000

# Command to run the application
# TODO: ENTRYPOINT
# CMD ["node", "dist/main"]
CMD ["sh", "-c", "yarn db:deploy && node dist/main"]
