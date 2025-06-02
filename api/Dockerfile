# Use the official Node.js image as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /usr/workspace

# Copy the rest of the application files
COPY package.json yarn.lock ./

# Install the application dependencies
# Build the NestJS application
RUN corepack enable && \
  yarn install --immutable

COPY . .

RUN yarn build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
