# NestJS-playground

NestJS learning project — Todo List app with user authentication and REST API. Demonstrates core NestJS concepts and modern frontend practices. Great for showcasing backend skills, frontend skills, and usage of modern Node.js and React frameworks.

## Project Structure

- **[backend/](./backend)** — All NestJS backend logic:
  - Built with **NestJS** framework
  - Implements **middleware** for request handling
  - **JWT-based authorization** (simple implementation)
  - **Guards** for role-based and route-based access control
  - REST **API endpoints** for managing todos and user operations
  - Uses **TypeORM** for database integration

- **[frontend/](./frontend)** — All React frontend logic:
  - Built with **React** and **Tailwind CSS** (simple app UI)
  - State management using **Context API** for authentication, storing token/email in localStorage
  - API interactions handled with **@tanstack/react-query** (`useQuery` and `useMutation`) for data fetching and validating tokens
  - Modular structure for **components, hooks, and contexts** used across pages, forms, and UI elements

- **[docker/](./docker)** — Docker configurations:
  - **docker-compose.db.yml** — runs only the database
  - **docker-compose.backend.yml** — runs the backend service (depends on database)
  - **docker-compose.frontend.yml** — runs the frontend service (depends on backend & database)
  - **docker-compose.all.yml** — runs full stack (frontend + backend + database)
  - **create_network.sh** — prepares shared Docker network for all services

## Documentation

- Detailed backend documentation is available in **[backend/README.md](./backend/README.md)**.
- Detailed frontend documentation is available in **[frontend/README.md](./frontend/README.md)**.


## Getting Started

Quick start to run the project locally. Choose one of the options below.

---

### 1) Full Docker Setup (All Services)

This version runs **frontend, backend, and database** inside Docker containers.

#### Start Database

```bash
# from the project root
# start all services (database, backend, frontend)
yarn docker:up:all
``` 

Access the app at http://localhost:3000/.
Make sure all containers are running and linked correctly.



### 2) Development Setup (Database Only in Docker)

This version is for local development. Only the database runs in Docker; backend and frontend run locally.

#### Infrastructure

```bash
# from the root 
# prepare and up database inside docker 
yarn docker:up:db
```

#### Backend

```bash
# navigate to backend folder
cd backend
# install dependencies
yarn install
# start backend development server
yarn start:dev
```

#### Frontend

```bash
# navigate to frontend folder
cd frontend
# install dependencies
yarn install
# start frontend development server
yarn dev
```

Go to the `http://localhost:3000/` to see the App 
