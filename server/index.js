require('dotenv').config();
const express = require('express');
const cors = require('cors');

const healthRoute = require('./routes/health');
const analyzeRoute = require('./routes/analyze');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRoute);
app.use('/api/analyze', analyzeRoute);

// Centralized error handler — must be registered LAST
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});