# Authentication Flow

1. **Registration:** User provides username, email, and password. Password is hashed using bcryptjs before saving to the database.
2. **Login:** User provides email and password. Server compares the provided password (after hashing) with the stored hashed password.
3. **JWT Generation:** Upon successful login/registration, a JSON Web Token (JWT) is generated, signed with JWT\_SECRET, and sent back to the client.
4. **Token Storage:** The client stores the JWT (e.g., in localStorage or HttpOnly cookie - localStorage seems to be used by the client).
5. **Authenticated Requests:** For protected routes, the client sends the JWT in the Authorization header (e.g., Authorization: Bearer \<token>).
6. **Token Verification:** The server uses middleware (authMiddleware.js) to verify the JWT. If valid, user information is attached to the request object (req.user), and the request proceeds.
