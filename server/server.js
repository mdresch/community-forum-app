require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ServerRateLimiter = require('./middleware/rateLimiter');
const postsRouter = require('./routes/posts');

const app = express();
const rateLimiter = new ServerRateLimiter();

app.use(express.json());
app.use(rateLimiter.middleware());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use posts routes
app.use('/api/posts', postsRouter);

// Example route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});