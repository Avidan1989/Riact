const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/users'); // Ensure this is pointing to the correct path
const productRoutes = require('./routes/products');
const articleRoutes = require('./routes/articles');
const port = 8801;

app.use(express.json());
app.use(cors());

// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000',  // Front-end URL if it's running on port 3000
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

// Routes
app.use('/users', userRoutes);  // User routes for login, registration, etc.
app.use('/prods', (req, res, next) => {
  console.log(`Received request at /prods: ${req.method} ${req.url}`);
  next();
}, productRoutes);
app.use('/articles', articleRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err); // Log error
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
