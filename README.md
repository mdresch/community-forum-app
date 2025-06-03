# Community forum app

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/menno-dreschers-projects/v0-community-forum-app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/Ut2j3d7bmi0)

---

## Overview

This repository stays in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

---

## Deployment

Your project is live at:

**[https://vercel.com/menno-dreschers-projects/v0-community-forum-app](https://vercel.com/menno-dreschers-projects/v0-community-forum-app)**

---

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/Ut2j3d7bmi0](https://v0.dev/chat/projects/Ut2j3d7bmi0)**

---

## Backend Setup

The backend server is located in the `/server` directory and uses Node.js, Express, and MongoDB Atlas.

### Environment Variables

Create a `.env` file in `/server` with the following content:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/community-forum-app
JWT_SECRET=yourrandomjwtsecretstring
JWT_EXPIRE=30d
```

- Replace `<username>`, `<password>`, and `<cluster-url>` with your MongoDB Atlas credentials.
- Generate a strong `JWT_SECRET` (e.g., `openssl rand -base64 32`).

### Running the Backend Locally

```bash
cd server
npm install
npm start
```

The backend will run on the port specified in your `.env` file (default: 5000).

---

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

---

## Notes

- **Do not commit your `.env` file or sensitive credentials to version control.**
- For local development, you can use a local MongoDB instance by updating `MONGO_URI` to `mongodb://localhost:27017/communityforum`.