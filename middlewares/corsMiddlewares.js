const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173', 
  'https://mazo-p11-o323.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

