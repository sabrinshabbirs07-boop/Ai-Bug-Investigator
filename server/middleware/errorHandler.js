// Centralized error handler — every route's errors funnel through here.
// Always returns a consistent shape: { error: true, message, code }

function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || 'Something went wrong. Please try again.';
  const code = err.code || 'INTERNAL_ERROR';

  res.status(status).json({ 
    error: true, 
    message, 
    code 
  });
}

module.exports = errorHandler;