# Project Structure

community-forum-app/\
├── client/ # React Frontend (Vite)\
│ ├── public/ # Static assets\
│ ├── src/\
│ │ ├── assets/ # Images, fonts, etc.\
│ │ ├── components/ # Reusable React components\
│ │ ├── context/ # React Context API for state management (AuthContext, PostContext)\
│ │ ├── hooks/ # Custom React hooks\
│ │ ├── layouts/ # Layout components (e.g., MainLayout)\
│ │ ├── pages/ # Page-level components (routed components)\
│ │ ├── services/ # API service functions (e.g., authService.js, postService.js)\
│ │ ├── App.jsx # Main App component with routing\
│ │ ├── index.css # Global styles (Tailwind base)\
│ │ ├── main.jsx # Entry point for React app\
│ ├── .env.example # Example environment variables for client\
│ ├── index.html # Main HTML file for Vite\
│ ├── package.json\
│ ├── tailwind.config.js # Tailwind CSS configuration\
│ └── vite.config.js # Vite configuration\
│\
├── server/ # Node.js/Express Backend\
│ ├── config/ # Configuration files (e.g., db.js)\
│ ├── controllers/ # Logic for handling requests (authController, postController, etc.)\
│ ├── middleware/ # Custom middleware (e.g., authMiddleware, errorMiddleware)\
│ ├── models/ # Mongoose schemas/models (User, Post, Comment)\
│ ├── routes/ # API route definitions (authRoutes, postRoutes, etc.)\
│ ├── .env.example # Example environment variables for server\
│ ├── .env # Server environment variables (ignored by git)\
│ ├── package.json\
│ └── server.js # Main server entry point\
│\
├── .gitignore\
├── package.json # Root package.json (for concurrently, install-all)\
└── README.md
