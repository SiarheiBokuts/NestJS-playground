# NestJS-playground Frontend

This is the frontend service for the **NestJS-playground** project — a Todo List app with JWT user authentication and REST API. Built with **Next.js**, **React**, **Tailwind CSS**, and **@tanstack/react-query** for data fetching and state management.

## Prerequisites

- **Node.js 22** (LTS)
- **Yarn** or **npm**
- Backend API running on `http://localhost:8000` (see backend README)

## Getting Started

### Step 1: Install dependencies

```bash
cd frontend
yarn install
```

### Step 2: Start the development server

```bash
yarn dev
```

The frontend server will run on [http://localhost:3000](http://localhost:3000) by default. Make sure your backend API is running so that the frontend can fetch data.

## Environment Variables

- The frontend can use a `.env` file for local development, e.g.:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Features

- **Next.js**
- **React 19** with **functional components** and **hooks**
- **Tailwind CSS 4** for styling
- **@tanstack/react-query 5** for data fetching, caching, and token validation
- **Context API** for authentication state management (stores token/email in localStorage)
- Modular structure for **components, hooks, and contexts** used across pages

### Running in Docker

To run the frontend with Docker:

1. Make sure the backend container is running (see `yarn docker:up:backend`).

2. From the project root, start the frontend container:

```bash
yarn docker:up:frontend
```

### Notes

- Make sure backend and database containers are running before starting the frontend
- Environment variables (`NEXT_PUBLIC_API_URL`) are required for connecting to backend API
- The frontend automatically hot-reloads on code changes during development
