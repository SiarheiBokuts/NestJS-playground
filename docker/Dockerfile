# backend/Dockerfile
# Use Node.js LTS
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all source code
COPY . .

# Copy base environment file
COPY .env .env

# Copy special Docker override environment variables
# These are additional values that should override the base .env for Docker deployments
COPY docker/.env.overrides.docker .env.docker

# Append Docker-specific overrides to the base .env
# This ensures DATABASE_HOST, DATABASE_PORT, or any other overrides are applied
RUN cat .env.docker >> .env

# Build the NestJS application (if using TypeScript)
RUN yarn build

# Expose application port
EXPOSE 8000

# Start the application
CMD ["yarn", "start:prod"]
