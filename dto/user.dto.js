/**
 * Data Transfer Objects for User endpoints
 */

// Get users endpoint
const getUsersDtoIn = {
  search: {
    type: 'string',
    required: false,
    maxLength: 100,
    trim: true
  }
};

const getUsersDtoOut = {
  users: {
    type: 'array',
    required: true,
    items: {
      id: { type: 'string', required: true },
      name: { type: 'string', required: true },
      createdAt: { type: 'date', required: true }
    }
  }
};

// Get user endpoint
const getUserDtoOut = {
  user: {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    createdAt: { type: 'date', required: true }
  }
};

// Update user endpoint
const updateUserDtoIn = {
  name: {
    type: 'string',
    required: true,
    minLength: 1,
    maxLength: 100,
    trim: true
  }
};

const updateUserDtoOut = {
  user: {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    createdAt: { type: 'date', required: true }
  }
};

module.exports = {
  getUsers: { dtoIn: getUsersDtoIn, dtoOut: getUsersDtoOut },
  getUser: { dtoIn: null, dtoOut: getUserDtoOut },
  updateUser: { dtoIn: updateUserDtoIn, dtoOut: updateUserDtoOut }
};

