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

## Notes

- The backend currently uses SQLite for local development and includes Sequelize models for Users, Projects, Tasks, and Notifications.
- The frontend includes a theme context, auth context, and animated app routes for a polished user experience.
- Add a `.env` file in the backend if you want to configure JWT secrets, database credentials, or other production settings.

## GitHub

This repository is connected to the remote `https://github.com/Lakshmi-Madhuksha-13/PROJECT-MANAGEMENT-PORTAL.git`.
