# Application Profiles Documentation

## Overview

The application uses a profile-based authorization system where each user has a profile that determines their permissions. Profiles are hierarchical, meaning higher-level profiles inherit permissions from lower-level profiles.

## Profile Definitions

### UNAUTHENTICATED
- **Description:** Base profile for users who are not logged in
- **Permissions:**
  - Access public endpoints (register, login)
- **Inherits:** None

### AUTHENTICATED
- **Description:** Base profile for all logged-in users
- **Permissions:**
  - All UNAUTHENTICATED permissions
  - View and update own user profile
  - Search for users
  - Create shop lists (becomes owner)
  - View own shop lists
- **Inherits:** UNAUTHENTICATED

### MEMBER
- **Description:** Profile for users who are members of a shop list
- **Permissions:**
  - All AUTHENTICATED permissions
  - View shop list details
  - Add items to shop list
  - Update items in shop list
  - Delete items from shop list
  - View shop list members
  - Update shop list (name, archived status)
- **Inherits:** AUTHENTICATED, UNAUTHENTICATED
- **Note:** This profile is context-specific to a shop list

### OWNER
- **Description:** Profile for users who own a shop list
- **Permissions:**
  - All MEMBER permissions
  - Add members to shop list
  - Remove members from shop list
  - Change member roles
  - Delete shop list
- **Inherits:** MEMBER, AUTHENTICATED, UNAUTHENTICATED
- **Note:** This profile is context-specific to a shop list

## Profile Assignment

1. **UNAUTHENTICATED:** Default for all users before login
2. **AUTHENTICATED:** Assigned after successful login via JWT token
3. **MEMBER:** Assigned when user is added to a shop list with 'member' role
4. **OWNER:** Assigned when:
   - User creates a shop list (automatic)
   - User is added to a shop list with 'owner' role
   - User's role is changed from 'member' to 'owner'

## Profile Checking

Profiles are checked using middleware:
- `protect` - Sets AUTHENTICATED profile for authenticated users
- `checkMember` - Verifies MEMBER or OWNER profile for a specific shop list
- `checkOwner` - Verifies OWNER profile for a specific shop list

The `hasProfile()` function checks if a user's profile has the required permissions, taking into account the profile hierarchy.

## Implementation

Profiles are defined in `config/profiles.js` and used throughout the application via middleware in `middleware/auth.js`.

