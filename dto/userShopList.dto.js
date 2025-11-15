/**
 * Data Transfer Objects for User-ShopList relationship endpoints
 */

// Get members endpoint
const memberDtoOut = {
  id: { type: 'string', required: true },
  userId: { type: 'string', required: true },
  userName: { type: 'string', required: true },
  role: {
    type: 'string',
    required: true,
    enum: ['member', 'owner']
  },
  addedAt: { type: 'date', required: true }
};

const getMembersDtoOut = {
  members: {
    type: 'array',
    required: true,
    items: memberDtoOut
  }
};

// Add member endpoint
const addMemberDtoIn = {
  userId: {
    type: 'string',
    required: true,
    format: 'objectId'
  },
  role: {
    type: 'string',
    required: false,
    enum: ['member', 'owner'],
    default: 'member'
  }
};

const addMemberDtoOut = memberDtoOut;

// Update member role endpoint
const updateMemberRoleDtoIn = {
  role: {
    type: 'string',
    required: true,
    enum: ['member', 'owner']
  }
};

const updateMemberRoleDtoOut = memberDtoOut;

// Remove member endpoint
const removeMemberDtoOut = {
  success: { type: 'boolean', required: true }
};

module.exports = {
  getMembers: { dtoIn: null, dtoOut: getMembersDtoOut },
  addMember: { dtoIn: addMemberDtoIn, dtoOut: addMemberDtoOut },
  updateMemberRole: { dtoIn: updateMemberRoleDtoIn, dtoOut: updateMemberRoleDtoOut },
  removeMember: { dtoIn: null, dtoOut: removeMemberDtoOut }
};

