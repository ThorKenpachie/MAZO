// CORS middleware - Allowing specific origin (your frontend)
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // Removed the extra space after the URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow Authorization header (for JWT)
}));
