require('dotenv').config();
const express = require('express');
const cors = require('cors');

const healthRoute = require('./routes/health');
const analyzeRoute = require('./routes/analyze');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "https://ai-bug-investigator.vercel.app",
    "https://ai-bug-investigator-mmidhi0ea-ai-bug-investigator.vercel.app",
    "http://localhost:5500",
    "http://127.0.0.1:5500"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));
app.options("*", cors());
// Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

app.use(express.json({ limit: '200kb' }));

// Catch malformed JSON bodies and oversized payloads cleanly
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
    return res.status(400).json({ error: true, message: 'Invalid JSON in request body.', code: 'INVALID_JSON' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: true, message: 'Request body is too large.', code: 'PAYLOAD_TOO_LARGE' });
  }
  next(err);
});

app.use('/api/health', healthRoute);
app.use('/api/analyze', analyzeRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});