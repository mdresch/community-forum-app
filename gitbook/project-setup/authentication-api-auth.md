# Authentication (/api/auth)

* POST /api/auth/register: Register a new user.
  * Body: { username, email, password }
* POST /api/auth/login: Log in an existing user.
  * Body: { email, password }
* GET /api/auth/me: Get the currently authenticated user's profile (requires token).

\
