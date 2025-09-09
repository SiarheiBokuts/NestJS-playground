# NestJS Backend

This is the backend service for the **NestJS-playground** project — a Todo List app with user authentication and REST API.

## Prerequisites

- **Node.js 22** (LTS)
- **Yarn**
- Database (PostgreSQL) — can be run via Docker using the scripts below.

## Getting Started

### Step 1: Prepare the database

From the project root, run:

```bash
yarn docker:up:db
```cd

This will start a PostgreSQL database inside Docker. Make sure it is running before starting the backend.

### Step 2: Install dependencies

```bash
cd backend
yarn install
```

### Step 3: Start the development server
```bash
yarn start:dev
```

### Step 4: Access the backend

The backend server will run on `http://localhost:8000` by default. Make sure your frontend points to this URL for API requests.

## Running in Docker

To run the backend with Docker:

1. Make sure the database container is running (see `yarn docker:up:db`).

2. From the project root, start the backend container:

```bash
yarn docker:up:backend
```


## Environment Variables

- The backend uses environment variables for:
  - Database connection: `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME`
  - JWT secret: `JWT_SECRET`
  - Backend server port: `PORT`
- You can set these in a `.env` file in the backend folder.

## Features

- **NestJS** framework for modular and maintainable architecture
- **JWT-based authentication** for users
- **Middleware** to validate tokens on protected routes
- **TypeORM** for database integration
- **Guards** for role-based and route-based access control
- REST **API endpoints** for managing todos and users

## Project Structure

- `src/` — main source code
  - `modules/` — feature modules (todos, auth, etc.)
  - `middlewares/` — for decoding JWT tokens from `Authorization` headers and attaching the user payload to `req.user`
  - `guards/` — route access control
  - `main.ts` — entry point, sets up global pipes and CORS
- `db/typeorm.config.ts` — TypeORM configuration

## API Endpoints (examples)

| Method | Endpoint           | Description                   |
|--------|------------------|-------------------------------|
| GET    | /todos              | List all todos                |
| POST   | /todos              | Create a new todo             |
| DELETE | /todos/:id          | Delete a todo                 |
| Post   | /todos/:id/complete | Complete a todo               |
| POST   | /auth/register      | Register a new user           |
| POST   | /auth/login         | Authenticate a user, get JWT  |

## Notes

- Ensure the database is running before starting the backend
- Environment variables are required for database connection, JWT secret, and other configurations
