# Deployment (Conceptual)

**Backend (Node.js/Express):**

* Platforms: Heroku, AWS Elastic Beanstalk, Google Cloud Run, DigitalOcean App Platform, Render.
* Considerations:
  * Set NODE\_ENV=production.
  * Configure environment variables on the platform.
  * Ensure MongoDB is accessible (e.g., MongoDB Atlas).
  * Use a process manager like PM2.

**Frontend (React/Vite):**

* Platforms: Netlify, Vercel, GitHub Pages, AWS S3/CloudFront, Firebase Hosting.
* Build command: npm run build (or yarn build) in the client directory. This creates a dist folder.
* Deploy the contents of the client/dist folder.
* Configure API proxy or set VITE\_API\_BASE\_URL to the deployed backend URL.

**Database (MongoDB):**

* Cloud Service: MongoDB Atlas (recommended for ease of use and scalability).
* Self-hosted: On a VPS, ensuring proper security and backups.
