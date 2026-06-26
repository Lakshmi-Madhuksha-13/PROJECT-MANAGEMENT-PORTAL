# ProjectNest Deployment Guide

This guide describes the step-by-step process to deploy the ProjectNest monorepo:
1. **Frontend**: Deployed to Vercel.
2. **Database (PostgreSQL)**: Deployed to Render.
3. **Backend (Express Node.js Service)**: Deployed to Render.

---

## 🗄️ Step 1: Deploy the Database on Render

Since Render natively supports PostgreSQL, we have added PostgreSQL support to your backend config. We will deploy a managed PostgreSQL instance:

1. Log in to the [Render Dashboard](https://dashboard.render.com).
2. Click **New +** at the top right and select **PostgreSQL**.
3. Fill in the database details:
   - **Name**: `projectnest-db`
   - **Database Name**: `projectnest`
   - **User**: (leave default or pick a username)
   - **Region**: Select the region closest to you.
   - **Instance Type**: Select the **Free** plan.
4. Click **Create Database**.
5. Once the database status changes to **Available**, scroll down to the **Connection Info** section:
   - Copy the **External Connection String** (it starts with `postgres://...`). You will need this for the backend.

---

## ⚙️ Step 2: Deploy the Backend on Render

Deploy the Node.js Express server as a Render Web Service:

1. From the Render Dashboard, click **New +** and select **Web Service**.
2. Connect your GitHub repository: `https://github.com/Lakshmi-Madhuksha-13/PROJECT-MANAGEMENT-PORTAL`.
3. Configure the Web Service:
   - **Name**: `projectnest-backend`
   - **Region**: (Same region as your database)
   - **Branch**: `main`
   - **Root Directory**: `backend` *(CRITICAL: This ensures Render runs inside the backend folder)*
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Select the **Free** plan.
4. Scroll down and click **Advanced** to add **Environment Variables**:
   - `DATABASE_URL`: *Paste the External Connection String copied from Step 1*
   - `JWT_SECRET`: *Enter a secure random string (e.g. `supersecretkey123`)*
   - `CORS_ORIGIN`: *Paste your Vercel frontend production URL (e.g., `https://projectnest-one.vercel.app`), or use `*` to allow all origins*
   - `NODE_ENV`: `production`
5. Click **Create Web Service**.
6. Once deployed, note down the URL of your backend (e.g., `https://projectnest-backend.onrender.com`).

---

## 🌐 Step 3: Deploy the Frontend on Vercel

Deploy the frontend React app and hook it up to the Render backend:

1. Log in to the [Vercel Dashboard](https://vercel.com).
2. Click **Add New** and select **Project**.
3. Import your GitHub repository: `https://github.com/Lakshmi-Madhuksha-13/PROJECT-MANAGEMENT-PORTAL`.
4. In the **Configure Project** settings:
   - **Framework Preset**: Select **Vite** or leave it as `Other` (Vercel reads `vercel.json` and builds correctly).
   - **Root Directory**: Leave it as the root of the repository (since we use a workspace build config in the root `vercel.json`).
5. Open the **Environment Variables** section and add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://projectnest-backend.onrender.com/api` *(Replace with your actual Render Backend URL from Step 2)*
6. Click **Deploy**.
7. Vercel will automatically read [vercel.json](file:///d:/KLENTY%20PROJECT%202/vercel.json), build the frontend, and direct traffic to the right paths.

---

## 🔄 Verification & Checking Connection

1. Open your Vercel URL in your browser.
2. Open Developer Tools (F12) -> Network tab.
3. Attempt to sign up or log in.
4. Verify that requests are successfully sent to `https://projectnest-backend.onrender.com/api/auth/login` (or signup) and receive `200 OK` responses.
