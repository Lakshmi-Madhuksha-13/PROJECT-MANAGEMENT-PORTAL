# ProjectNest / Project Management Portal

A full-stack project management portal built with React + Vite on the frontend and Node.js + Express + Sequelize on the backend.

## Overview

The application provides:
- Authentication and protected routes
- Dashboard with recent projects, tasks, and activity
- Projects and tasks management flows
- Notifications, reports, calendar, and settings pages
- Light / dark theme support with persistent preferences
- Animated landing page and smooth route transitions

## Folder Structure

- `frontend/` — React application using Vite, Tailwind CSS, Framer Motion, and React Router
- `backend/` — Express API using Sequelize with SQLite fallback and API routes for auth, projects, tasks, reports, and notifications

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Run the backend

```bash
cd backend
npm start
```

This starts the API server using `server.js`.

### Run the frontend

```bash
cd frontend
npm run dev
```

This starts the Vite development server for the React app.

## Available Scripts

### Backend
- `npm start` — starts Express server
- `npm run dev` — starts Express server with `nodemon`

### Frontend
- `npm run dev` — starts Vite development server
- `npm run build` — builds the frontend for production
- `npm run preview` — serves the built frontend locally

## Deployment

### Deploy locally

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
3. Run the backend:
   ```bash
   cd backend
   npm start
   ```
4. Run the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

### Deploy to Vercel

This repository is configured for Vercel deployment. The frontend is hosted as a static app, and the Express API is available under `/api`.

From the project root:

```bash
vercel --prod
```

> If you want to deploy only the frontend, use `cd frontend && vercel --prod`.

### Vercel notes

- The frontend will use `VITE_API_BASE_URL` if provided, otherwise requests to `/api` will be proxied to the same origin.
- The backend currently falls back to SQLite if MySQL is unavailable, so Vercel deployment will work for a demo but is not ideal for persistent production storage.
- Add backend environment variables in Vercel if you want to configure database credentials, JWT secrets, or CORS origins.

## Notes

- The backend currently uses SQLite for local development and includes Sequelize models for Users, Projects, Tasks, and Notifications.
- The frontend includes a theme context, auth context, and animated app routes for a polished user experience.
- Add a `.env` file in the backend if you want to configure JWT secrets, database credentials, or other production settings.

## GitHub

This repository is connected to `https://github.com/Lakshmi-Madhuksha-13/PROJECT-MANAGEMENT-PORTAL.git`.
