const express = require('express');
const router = express.Router();

// GET /api/health — confirms the backend is running and reachable
router.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = router;