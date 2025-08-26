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

# Copy and rename .env.docker -> .env
COPY docker/.env.docker .env

# Build the NestJS application (if using TypeScript)
RUN yarn build

# Expose application port
EXPOSE 8000

# Start the application
CMD ["yarn", "start:prod"]
