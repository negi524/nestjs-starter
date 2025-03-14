# 開発環境
# Use the official Node.js image as the base image
FROM node:20 AS development

# Set the working directory inside the container
WORKDIR /usr/workspace

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock .yarnrc.yml ./

# Install the application dependencies
RUN corepack enable && yarn install --immutable

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3020

# Command to run the application
CMD ["yarn", "run", "start:dev"]

# 本番環境
# Use the official Node.js image as the base image
FROM node:20 AS production

# Set the working directory inside the container
WORKDIR /usr/workspace

# Copy the rest of the application files
COPY . .

# Install the application dependencies
# Build the NestJS application
RUN corepack enable && \
  yarn install --immutable && \
  yarn run build

# Expose the application port
EXPOSE 3020

# Command to run the application
CMD ["yarn", "run", "start:prod"]
