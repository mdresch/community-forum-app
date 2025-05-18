# Environment Variables Server (server/.env)

Create this file by copying server/.env.example.

* NODE\_ENV: Application environment (development, production).
* PORT: Port for the backend server (e.g., 5000).
* MONGO\_URI: MongoDB connection string.
* JWT\_SECRET: Secret key for signing JWTs.
* JWT\_EXPIRE: JWT expiration time (e.g., 30d).

#### Client (client/.env)

The client (built with Vite) uses environment variables prefixed with VITE\_. Create a .env file in the client directory if needed (e.g., by copying client/.env.example if it exists, or creating it).

Example client/.env:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

content\_copydownloadUse code [with caution](https://support.google.com/legal/answer/13505487).

This variable would then be used in your API service files like import.meta.env.VITE\_API\_BASE\_URL.\
(Note: The current client/src/services/api.js hardcodes the base URL. Using an env variable is best practice.)
