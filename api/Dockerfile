# ビルド用イメージ
# Use the official Node.js image as the base image
FROM node:22 AS builder

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the rest of the application files
COPY . .

# Install the application dependencies
RUN corepack enable && \
  yarn install --immutable

# Build the NestJS application
# RUN yarn prisma generate && \
#   yarn build

RUN yarn db:deploy && \
  yarn build


# 実行用イメージ
FROM node:22

WORKDIR /usr/src/app

# ビルドの成果物のみコピー
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/generated ./generated

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
