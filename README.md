# NestJS-playground

NestJS learning project — Todo List app with user authentication using JWT and REST API. Demonstrates core NestJS concepts and modern frontend practices. Great for showcasing backend skills (NestJS, JWT, TypeORM), frontend skills (React, Tailwind, React Query), and usage of modern Node.js and React frameworks.

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

Access the app at http://localhost:3000/.


## Possible Improvements

The current authentication flow is intentionally simple for learning purposes — a single JWT token is stored in `localStorage` and sent with each request.  
While this works, it has some **security and UX limitations**:

- **Security risks**: Storing tokens in `localStorage` makes them accessible from JavaScript (potential XSS attacks).  
- **No token expiration handling**: Currently, the token has no expiration set, so there is no automatic refresh or session expiry.  
- **UX limitations**: The UI could be more user-friendly, especially when handling long lists of todos.  
- **CSRF protection**: Not required with the current setup, because authentication is handled via JWT in the Authorization header. If tokens were stored in cookies, CSRF protection would be necessary.  

### How to improve

**Authentication & Security**  
- Use **Access + Refresh tokens** instead of a single JWT.  
- Store the Refresh token in an **HTTP-only, Secure cookie**, and keep the Access token in memory only.  
- Implement **silent refresh** to automatically refresh the Access token before it expires.  
- Rotate Refresh tokens to reduce risk if they are compromised.  
- Add CSRF protection middleware on the backend **if authentication is moved to cookies**.  

**UX & Frontend**  
- **Enhance the frontend UI**: make it more responsive, intuitive, and visually appealing.  
- Implement **pagination or infinite scroll** for long lists of todos to improve performance and usability.  

Following these improvements would make the project production-ready in terms of authentication, session management, and overall user experience. 🤗
