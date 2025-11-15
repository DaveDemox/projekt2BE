/**
 * Data Transfer Objects for Authentication endpoints
 */

// Register endpoint
const registerDtoIn = {
  name: {
    type: 'string',
    required: true,
    minLength: 1,
    maxLength: 100,
    trim: true
  },
  email: {
    type: 'string',
    required: true,
    format: 'email',
    maxLength: 255,
    lowercase: true,
    trim: true
  },
  password: {
    type: 'string',
    required: true,
    minLength: 6,
    maxLength: 100
  }
};

const registerDtoOut = {
  token: {
    type: 'string',
    required: true
  },
  user: {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    email: { type: 'string', required: true }
  }
};

// Login endpoint
const loginDtoIn = {
  email: {
    type: 'string',
    required: true,
    format: 'email',
    maxLength: 255,
    lowercase: true,
    trim: true
  },
  password: {
    type: 'string',
    required: true,
    minLength: 1
  }
};

const loginDtoOut = {
  token: {
    type: 'string',
    required: true
  },
  user: {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    email: { type: 'string', required: true }
  }
};

// Get me endpoint
const getMeDtoOut = {
  user: {
    id: { type: 'string', required: true },
    name: { type: 'string', required: true },
    email: { type: 'string', required: true },
    createdAt: { type: 'date', required: true },
    lastLogin: { type: 'date', required: false }
  }
};

module.exports = {
  register: { dtoIn: registerDtoIn, dtoOut: registerDtoOut },
  login: { dtoIn: loginDtoIn, dtoOut: loginDtoOut },
  getMe: { dtoIn: null, dtoOut: getMeDtoOut }
};

