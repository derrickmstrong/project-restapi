const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  cors = require('cors'),
  PORT = process.env.PORT || 3000,
  // Import Routes
  postsRouter = require('./routes/posts');

// Require dotenv to pull in hidden config info
require('dotenv/config');

// MIDDLEWARE
// In this example, the middleware only runs when the localhost:3000/posts route is hit

// Cors
app.use(cors());

// To parse json data - This replaces body-parser middleware
app.use(express.json());

// URL-Encoded extended: true allows you to create nested objects
app.use(express.urlencoded({ extended: true }))

// Logger
app.use('/posts', (req, res, next) => {
  console.log('Logged at ' + Date());
  next();
});

// Serve Static files
app.use(express.static('client'))

// Setup Routes Middleware
app.use('/posts', postsRouter);

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome Home!');
});

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to DB');
  }
);

// Listening on port
app.listen(PORT, () => {
  console.log(`Server is running on PORT: http://localhost:${PORT}`);
});
