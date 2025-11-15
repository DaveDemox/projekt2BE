const { PROFILES, hasProfile } = require('../config/profiles');
const { sendError } = require('../utils/response');

// Protect routes - verify JWT token and set AUTHENTICATED profile
// Note: Simplified for testing without database - accepts any token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return sendError(res, 401, 'Not authorized to access this route', null);
    }

    // Simplified: For testing, accept any token and create mock user
    // In real implementation, this would verify JWT and fetch user from database
    req.user = {
      _id: 'mock-user-id',
      name: 'Mock User'
    };
    req.auth = {
      userId: req.user._id,
      email: 'mock@example.com'
    };
    req.userProfile = PROFILES.AUTHENTICATED; // Base authenticated profile
    
    next();
  } catch (error) {
    return sendError(res, 500, 'Server error', null, { error: error.message });
  }
};

/**
 * Check if user has required profile for a shop list
 * Sets req.userProfile and req.userShopList
 * Note: Simplified for testing without database - uses mock data
 */
exports.checkShopListProfile = (requiredProfile) => {
  return async (req, res, next) => {
    try {
      const shopListId = req.params.shopListId || req.params.id || req.body.shopListId;

      if (!shopListId) {
        return sendError(res, 400, 'Shop list ID is required', req.body);
      }

      // Simplified: For testing, create mock userShopList based on shopListId
      // In real implementation, this would query the database
      // For testing: assume user is owner if shopListId contains 'owner', member otherwise
      const mockRole = shopListId.includes('owner') || requiredProfile === PROFILES.OWNER ? 'owner' : 'member';
      
      req.userShopList = {
        userId: req.user._id,
        shopListId: shopListId,
        role: mockRole
      };

      // Map role to profile
      const roleProfile = mockRole === 'owner' ? PROFILES.OWNER : PROFILES.MEMBER;
      req.userProfile = roleProfile;

      // Check if user has required profile
      if (!hasProfile(roleProfile, requiredProfile)) {
        return sendError(
          res,
          403,
          `This action requires ${requiredProfile} profile`,
          req.body
        );
      }

      next();
    } catch (error) {
      return sendError(res, 500, 'Server error', req.body, { error: error.message });
    }
  };
};

// Convenience middleware for owner profile
exports.checkOwner = exports.checkShopListProfile(PROFILES.OWNER);

// Convenience middleware for member profile (member or owner)
exports.checkMember = exports.checkShopListProfile(PROFILES.MEMBER);
