/**
 * Application Profiles (Actors)
 * 
 * Defines the roles and permissions for different actors in the system
 */

const PROFILES = {
  // Unauthenticated user
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  
  // Authenticated user (base profile)
  AUTHENTICATED: 'AUTHENTICATED',
  
  // Shop list member - can view and edit items
  MEMBER: 'MEMBER',
  
  // Shop list owner - can manage list, members, and items
  OWNER: 'OWNER'
};

/**
 * Profile hierarchy - higher profiles inherit permissions from lower ones
 */
const PROFILE_HIERARCHY = {
  [PROFILES.UNAUTHENTICATED]: [],
  [PROFILES.AUTHENTICATED]: [PROFILES.UNAUTHENTICATED],
  [PROFILES.MEMBER]: [PROFILES.AUTHENTICATED, PROFILES.UNAUTHENTICATED],
  [PROFILES.OWNER]: [PROFILES.MEMBER, PROFILES.AUTHENTICATED, PROFILES.UNAUTHENTICATED]
};

/**
 * Check if a profile has required permission
 */
const hasProfile = (userProfile, requiredProfile) => {
  if (userProfile === requiredProfile) return true;
  
  const inheritedProfiles = PROFILE_HIERARCHY[userProfile] || [];
  return inheritedProfiles.includes(requiredProfile);
};

module.exports = {
  PROFILES,
  PROFILE_HIERARCHY,
  hasProfile
};

