const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error('⚠️ Server Error:', err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id: ${err.value}`;
    return res.status(404).json({
      success: false,
      message,
      errorCode: 'RESOURCE_NOT_FOUND',
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate value entered for '${field}'. Please use another value.`;
    return res.status(400).json({
      success: false,
      message,
      errorCode: 'DUPLICATE_KEY_ERROR',
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message).join(', ');
    return res.status(400).json({
      success: false,
      message,
      errorCode: 'VALIDATION_ERROR',
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token.',
      errorCode: 'INVALID_TOKEN',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Authentication token has expired. Please log in again.',
      errorCode: 'TOKEN_EXPIRED',
    });
  }

  // Mongoose connection buffering timeout
  if (err.name === 'MongooseError' && err.message && err.message.includes('buffering timed out')) {
    return res.status(503).json({
      success: false,
      message: 'Database is currently connecting. Please retry in a few moments.',
      errorCode: 'DATABASE_CONNECTING',
    });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
    errorCode: error.errorCode || 'INTERNAL_SERVER_ERROR',
  });
};

module.exports = errorHandler;
