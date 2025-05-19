# Local Development Setup

## Community Forum App - Local Development Setup

This guide will walk you through setting up the Community Forum App project on your local machine for development.

### Prerequisites

Before you begin, ensure you have the following installed:

1. **Git:** [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. **Node.js & npm:** (LTS version recommended) [https://nodejs.org/](https://nodejs.org/)
3. **MongoDB:**
   * **Option A: Local Installation:** [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   * **Option B: Docker:** If you have Docker installed, you can easily run MongoDB in a container.
4. **A Code Editor:** (e.g., VS Code)

### Setup Instructions

#### 1. Clone the Repository

Open your terminal or command prompt and clone the repository:

```bash
git clone https://github.com/mdresch/community-forum-app.git
cd community-forum-app
```

content\_copydownloadUse code [with caution](https://support.google.com/legal/answer/13505487).Markdown

#### 2. Install Dependencies

This project uses a root package.json with a script to install dependencies for both the client and server.

From the **root** directory (community-forum-app):

```
npm run install-all
```

content\_copydownloadUse code [with caution](https://support.google.com/legal/answer/13505487).Bash

This command will:

* Install dependencies for the root project (mainly concurrently).
* Navigate into the server directory and run npm install.
* Navigate into the client directory and run npm install.

If npm run install-all gives you issues for any reason, you can install them manually:

```
# In the root directory (community-forum-app)
npm install

# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

#### 3. Set Up Environment Variables (Backend)

The backend server requires environment variables, primarily for the MongoDB connection string and JWT secret.

1.  Navigate to the server directory:

    ```
    cd server
    ```

2.  Create a .env file by copying the example file:

    ```
    cp .env.example .env
    ```

3.  Open the newly created .env file in your code editor and configure the variables:

    ```
    NODE_ENV=development
    PORT=5000 # Or any port you prefer for the backend
    MONGO_URI=mongodb://localhost:27017/communityforum # Replace 'communityforum' with your desired DB name
    JWT_SECRET=yourrandomjwtsecretstring # Replace with a long, random, secret string
    JWT_EXPIRE=30d
    ```


    * **MONGO\_URI**:
      * If you installed MongoDB locally and it's running on the default port, mongodb://localhost:27017/communityforum should work. You can change communityforum to any database name you prefer; MongoDB will create it if it doesn't exist.
      * If you're using a cloud MongoDB instance (like MongoDB Atlas), use the connection string they provide.
    * **JWT\_SECRET**: Generate a strong, random string for this. For example, you can use an online generator or a command like openssl rand -base64 32 in your terminal.
4.  Navigate back to the root directory:

    ```
    cd ..
    ```


#### 4. Start MongoDB

Ensure your MongoDB server is running.

* **If installed locally:** Start the MongoDB service. The command varies by OS (e.g., sudo systemctl start mongod on Linux, brew services start mongodb-community on macOS, or starting from services on Windows).
*   **If using Docker:**\
    You can run a MongoDB container with the following command:

    ```
    docker run -d -p 27017:27017 --name mongodb-forum mongo
    ```


    This will start a MongoDB instance accessible on localhost:27017. The data will be lost if the container is removed unless you set up a volume. For development, this is often fine.

#### 5. Run the Development Servers

The project is configured to run both the client (React) and server (Node.js/Express) concurrently using a single command from the **root** directory.

From the **root** directory (community-forum-app):

```
npm run dev
```


This command executes:\
concurrently "npm run server --prefix server" "npm run start --prefix client"

* npm run server --prefix server: Starts the backend Node.js server (likely with nodemon for auto-restarts) on the port specified in server/.env (default 5000).
* npm run start --prefix client: Starts the React development server (usually on http://localhost:3000).

### Accessing the Application

Once the npm run dev command is running successfully:

* **Frontend (Client):** Open your web browser and navigate to http://localhost:3000 (or the port shown in your terminal for the React app).
* **Backend (API):** The API server will be running on http://localhost:5000 (or the PORT you set in server/.env). You typically won't access this directly in the browser, but the frontend will make requests to it.

You should now have the community forum app running locally!

### Running Tests

From the root directory:

```
npm test
```

### Troubleshooting / Notes

* **Port Conflicts:** If port 3000 or 5000 is already in use, the application might fail to start or React might ask if you want to run on another port.
  * For the backend, you can change the PORT in server/.env.
  * For the frontend, React's react-scripts usually prompts to use an alternative port. If not, you might need to configure it via package.json or a .env file in the client directory (e.g., PORT=3001).
* **MongoDB Connection Issues:** Ensure MongoDB is running and accessible at the URI specified in server/.env. Check your firewall if connecting to a remote MongoDB instance.
* **NODE\_ENV**: The .env.example sets NODE\_ENV=production. For development, it's better to set it to development as shown in the instructions above. This can affect error logging and other behaviors.
* **Initial Admin/User:** You will likely need to register a new user through the application's UI to start using it.

## Project Structure

```
community-forum-app/
├── client/      # React frontend
├── server/      # Node.js/Express backend
├── gitbook/     # Documentation
└── package.json
```

```markup
This README provides a comprehensive guide for someone to get the project up and running. Remember to commit this file (or a similar one) to your repository so others (and your future self) can easily set it up.
```

