/**
 * Standardized response handler
 * Returns responses in the format: { success, dtoIn, dtoOut, uuAppErrorMap }
 */

/**
 * Send success response
 */
const sendSuccess = (res, statusCode, dtoOut, dtoIn = null) => {
  const response = {
    success: true,
    dtoOut
  };

  if (dtoIn !== null) {
    response.dtoIn = dtoIn;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send error response
 */
const sendError = (res, statusCode, message, dtoIn = null, paramMap = {}) => {
  const response = {
    success: false,
    uuAppErrorMap: {
      [message.toLowerCase().replace(/\s+/g, '_')]: {
        message,
        paramMap
      }
    }
  };

  if (dtoIn !== null) {
    response.dtoIn = dtoIn;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send validation error response
 */
const sendValidationError = (res, errors, dtoIn = null) => {
  return res.status(400).json({
    success: false,
    dtoIn: dtoIn || {},
    uuAppErrorMap: {
      validation: {
        message: 'Validation failed',
        paramMap: {
          errors
        }
      }
    }
  });
};

/**
 * Send authorization error response
 */
const sendAuthorizationError = (res, message, dtoIn = null) => {
  return sendError(res, 403, message || 'Not authorized', dtoIn);
};

/**
 * Send not found error response
 */
const sendNotFoundError = (res, message, dtoIn = null) => {
  return sendError(res, 404, message || 'Resource not found', dtoIn);
};

/**
 * Send server error response
 */
const sendServerError = (res, error, dtoIn = null) => {
  console.error('Server error:', error);
  return sendError(
    res,
    500,
    'Internal server error',
    dtoIn,
    process.env.NODE_ENV === 'development' ? { error: error.message } : {}
  );
};

module.exports = {
  sendSuccess,
  sendError,
  sendValidationError,
  sendAuthorizationError,
  sendNotFoundError,
  sendServerError
};

