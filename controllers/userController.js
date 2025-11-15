const { sendSuccess, sendError } = require('../utils/response');

// @desc    Get all users (for searching and adding to lists)
// @route   GET /api/users
// @access  Private
// @note    Application logic not implemented - returns mock data
exports.getUsers = async (req, res) => {
  try {
    const dtoIn = req.query;
    
    // Application logic not implemented yet
    // This endpoint validates query params and returns mock data
    
    const dtoOut = {
      users: [
        {
          id: 'mock-user-1',
          name: 'Mock User 1',
          createdAt: new Date()
        },
        {
          id: 'mock-user-2',
          name: 'Mock User 2',
          createdAt: new Date()
        }
      ]
    };

    return sendSuccess(res, 200, dtoOut, dtoIn);
  } catch (error) {
    return sendError(res, 500, 'Internal server error', req.query, { error: error.message });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
// @note    Application logic not implemented - returns mock data
exports.getUser = async (req, res) => {
  try {
    const dtoIn = { id: req.params.id };
    
    // Application logic not implemented yet
    
    const dtoOut = {
      user: {
        id: req.params.id,
        name: 'Mock User',
        createdAt: new Date()
      }
    };

    return sendSuccess(res, 200, dtoOut, dtoIn);
  } catch (error) {
    return sendError(res, 500, 'Internal server error', { id: req.params.id }, { error: error.message });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (only own profile)
// @note    Application logic not implemented - returns validated input data
exports.updateUser = async (req, res) => {
  try {
    const dtoIn = { ...req.body, id: req.params.id };
    
    // Check if user is updating their own profile (authorization check)
    if (req.user && req.user._id.toString() !== req.params.id) {
      return sendError(res, 403, 'You can only update your own profile', dtoIn);
    }
    
    // Application logic not implemented yet
    // This endpoint validates input and returns it
    
    const dtoOut = {
      user: {
        id: req.params.id,
        name: dtoIn.name,
        createdAt: new Date()
      }
    };

    return sendSuccess(res, 200, dtoOut, dtoIn);
  } catch (error) {
    return sendError(res, 500, 'Internal server error', { ...req.body, id: req.params.id }, { error: error.message });
  }
};
