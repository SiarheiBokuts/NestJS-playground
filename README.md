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
  - State management using **Context API** for authentication
  - API interactions handled with **useQuery** and **useMutation** hooks
  - Modular component structure for pages, forms, and UI elements
  - Responsive and interactive UI

## Documentation

- Detailed backend documentation is available in **[backend/README.md](./backend/README.md)**.
- Detailed frontend documentation is available in **[frontend/README.md](./frontend/README.md)**.

## Getting Started

Quick start to run the project locally without reading full documentation.

### Backend

```bash
# navigate to backend folder
cd backend
# prepare Docker services (Postgres, etc.)
yarn docker:prepare
# start backend
yarn start:dev
```

### Frontend

```bash
# navigate to frontend folder
cd frontend
# install dependencies
yarn install
# start frontend development server
yarn dev
```
