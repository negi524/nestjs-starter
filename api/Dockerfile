# Baseイメージ
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ビルド用イメージ
# Use the official Node.js image as the base image
FROM base AS builder

# ARG DATABASE_URL
# ENV DATABASE_URL=${DATABASE_URL}

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application files
COPY . .

# Install the application dependencies
RUN pnpm i --prod --frozen-lockfile

RUN pnpm run build


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
# TODO: ENTRYPOINT
# CMD ["node", "dist/main"]
CMD ["sh", "-c", "pnpm run db:deploy && node dist/main"]
