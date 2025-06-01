# Use the official Node.js image as the base image
FROM node:22 AS production

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
# TODO: nodeコマンドを利用する
CMD ["yarn", "start:prod"]
