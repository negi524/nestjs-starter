# Baseイメージ
FROM node:22-slim AS base
# pnpmの設定
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apt-get update -y && \ 
  apt-get install -y openssl
RUN corepack enable

# ビルド用イメージ
# Use the official Node.js image as the base image
FROM base AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the application files
COPY . .

# Install the application dependencies
RUN pnpm i --prod --frozen-lockfile && \
  pnpm prisma:generate && \
  pnpm run build


# 実行用イメージ
FROM base

WORKDIR /app

# ビルドの成果物のみコピー
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/generated ./generated

# Expose the application port
EXPOSE 3000

# Command to run the application
ENTRYPOINT ["node", "dist/main"]
