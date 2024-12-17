const express = require('express');
const bodyParser = require('body-parser');

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors');

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// CORS middleware - Allowing specific origin (your frontend)
app.use(cors({
  origin: 'https://mazo-6.onrender.com/api', // Allow your frontend to access the server
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}));

// Health check route to ensure the server is running
app.get('/', (req, res) => {
  res.send('Eruel Mazo, NCF');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);  // This matches the frontend request
app.use('/api/dept', departmentRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/student', studentRoutes);

// Set the port for the server
const PORT = process.env.PORT || 5000;  // Use environment variable for port (for deployment)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
