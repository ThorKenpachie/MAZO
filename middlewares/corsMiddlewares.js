// CORS middleware - Allowing specific origin (your frontend)
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend to access the server
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}));

