# NestJS-playground
NestJS learning project — Todo List app with user authentication, role-based access, and REST API. Demonstrates core NestJS concepts: modules, controllers, services, middleware, and database integration (TypeORM). Great for showcasing backend skills and modern Node.js framework usage


## Project Structure

- **backend/** — All NestJS backend code: modules, controllers, services, entities, TypeORM config.


## Getting Started

Start backend service with Docker and run in development mode:

```bash
# navigate to backend folder
cd backend
# prepare Docker services (Postgres, etc.)
yarn docker:prepare
# start backend
yarn start:dev

