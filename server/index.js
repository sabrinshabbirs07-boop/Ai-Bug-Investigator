require('dotenv').config();

const express = require('express');
const cors = require('cors');

const healthRoute = require('./routes/health');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/health', healthRoute);


// Error Handler (must be last)
app.use(errorHandler);


// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});