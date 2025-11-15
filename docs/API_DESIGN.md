# API Design Documentation

## Application Profiles (Actors)

The application uses a profile-based authorization system with the following profiles:

### Profile Hierarchy

1. **UNAUTHENTICATED** - Base profile for unauthenticated users
   - Can only access public endpoints (register, login)

2. **AUTHENTICATED** - Base profile for authenticated users
   - Inherits: UNAUTHENTICATED
   - Can access user management endpoints
   - Can create shop lists

3. **MEMBER** - Profile for shop list members
   - Inherits: AUTHENTICATED, UNAUTHENTICATED
   - Can view and edit items in shop lists
   - Can view shop list members
   - Cannot manage members or delete lists

4. **OWNER** - Profile for shop list owners
   - Inherits: MEMBER, AUTHENTICATED, UNAUTHENTICATED
   - All member permissions plus:
   - Can manage shop list settings
   - Can add/remove members
   - Can change member roles
   - Can delete shop lists

## Data Transfer Objects (DTOs)

All endpoints use DTOs (Data Transfer Objects) for input (`dtoIn`) and output (`dtoOut`) validation.

### Response Format

All responses follow this standardized format:

**Success Response:**
```json
{
  "success": true,
  "dtoIn": { ... },  // Input data (if applicable)
  "dtoOut": { ... }  // Output data
}
```

**Error Response:**
```json
{
  "success": false,
  "dtoIn": { ... },  // Input data (if applicable)
  "uuAppErrorMap": {
    "error_key": {
      "message": "Error message",
      "paramMap": {
        "errors": [ ... ]  // Validation errors (if applicable)
      }
    }
  }
}
```

## Endpoint Specifications

### Authentication Endpoints

#### uuCmd: register / POST /api/auth/register
- **Endpoint Name:** register
- **Route:** POST /api/auth/register
- **Profile Required:** UNAUTHENTICATED
- **dtoIn:**
  - `name` (string, required, 1-100 chars)
  - `email` (string, required, valid email, max 255 chars)
  - `password` (string, required, 6-100 chars)
- **dtoOut:**
  - `token` (string)
  - `user` (object: id, name, email)

#### uuCmd: login / POST /api/auth/login
- **Endpoint Name:** login
- **Route:** POST /api/auth/login
- **Profile Required:** UNAUTHENTICATED
- **dtoIn:**
  - `email` (string, required, valid email)
  - `password` (string, required)
- **dtoOut:**
  - `token` (string)
  - `user` (object: id, name, email)

#### uuCmd: getMe / GET /api/auth/me
- **Endpoint Name:** getMe
- **Route:** GET /api/auth/me
- **Profile Required:** AUTHENTICATED
- **dtoIn:** None
- **dtoOut:**
  - `user` (object: id, name, email, createdAt, lastLogin)

### User Endpoints

#### uuCmd: getUsers / GET /api/users
- **Endpoint Name:** getUsers
- **Route:** GET /api/users
- **Profile Required:** AUTHENTICATED
- **dtoIn (query):**
  - `search` (string, optional, max 100 chars)
- **dtoOut:**
  - `users` (array of objects: id, name, createdAt)

#### uuCmd: getUser / GET /api/users/:id
- **Endpoint Name:** getUser
- **Route:** GET /api/users/:id
- **Profile Required:** AUTHENTICATED
- **dtoIn:** None (id from URL)
- **dtoOut:**
  - `user` (object: id, name, createdAt)

#### uuCmd: updateUser / PUT /api/users/:id
- **Endpoint Name:** updateUser
- **Route:** PUT /api/users/:id
- **Profile Required:** AUTHENTICATED (own profile only)
- **dtoIn:**
  - `name` (string, required, 1-100 chars)
- **dtoOut:**
  - `user` (object: id, name, createdAt)

### Shop List Endpoints

#### uuCmd: getShopLists / GET /api/shoplists
- **Endpoint Name:** getShopLists
- **Route:** GET /api/shoplists
- **Profile Required:** AUTHENTICATED
- **dtoIn (query):**
  - `archived` (string, optional, 'true' or 'false')
- **dtoOut:**
  - `shopLists` (array of shop list objects)

#### uuCmd: getShopList / GET /api/shoplists/:id
- **Endpoint Name:** getShopList
- **Route:** GET /api/shoplists/:id
- **Profile Required:** MEMBER
- **dtoIn:** None (id from URL)
- **dtoOut:**
  - Shop list object (id, name, archived, createdAt, items, role)

#### uuCmd: createShopList / POST /api/shoplists
- **Endpoint Name:** createShopList
- **Route:** POST /api/shoplists
- **Profile Required:** AUTHENTICATED
- **dtoIn:**
  - `name` (string, required, 1-200 chars)
- **dtoOut:**
  - Shop list object (creator becomes owner)

#### uuCmd: updateShopList / PUT /api/shoplists/:id
- **Endpoint Name:** updateShopList
- **Route:** PUT /api/shoplists/:id
- **Profile Required:** MEMBER
- **dtoIn:**
  - `name` (string, optional, 1-200 chars)
  - `archived` (boolean, optional)
- **dtoOut:**
  - Shop list object

#### uuCmd: deleteShopList / DELETE /api/shoplists/:id
- **Endpoint Name:** deleteShopList
- **Route:** DELETE /api/shoplists/:id
- **Profile Required:** OWNER
- **dtoIn:** None (id from URL)
- **dtoOut:**
  - `success` (boolean)

### Item Endpoints

#### uuCmd: addItem / POST /api/shoplists/:id/items
- **Endpoint Name:** addItem
- **Route:** POST /api/shoplists/:id/items
- **Profile Required:** MEMBER
- **dtoIn:**
  - `name` (string, required, 1-200 chars)
- **dtoOut:**
  - Shop list object

#### uuCmd: updateItem / PUT /api/shoplists/:id/items/:itemIndex
- **Endpoint Name:** updateItem
- **Route:** PUT /api/shoplists/:id/items/:itemIndex
- **Profile Required:** MEMBER
- **dtoIn:**
  - `name` (string, optional, 1-200 chars)
  - `completed` (boolean, optional)
- **dtoOut:**
  - Shop list object

#### uuCmd: deleteItem / DELETE /api/shoplists/:id/items/:itemIndex
- **Endpoint Name:** deleteItem
- **Route:** DELETE /api/shoplists/:id/items/:itemIndex
- **Profile Required:** MEMBER
- **dtoIn:** None (id and itemIndex from URL)
- **dtoOut:**
  - Shop list object

### Member Management Endpoints

#### uuCmd: getMembers / GET /api/shoplists/:shopListId/members
- **Endpoint Name:** getMembers
- **Route:** GET /api/shoplists/:shopListId/members
- **Profile Required:** MEMBER
- **dtoIn:** None (shopListId from URL)
- **dtoOut:**
  - `members` (array of member objects: id, userId, userName, role, addedAt)

#### uuCmd: addMember / POST /api/shoplists/:shopListId/members
- **Endpoint Name:** addMember
- **Route:** POST /api/shoplists/:shopListId/members
- **Profile Required:** OWNER
- **dtoIn:**
  - `userId` (string, required, valid ObjectId)
  - `role` (string, optional, 'member' or 'owner', default: 'member')
- **dtoOut:**
  - Member object

#### uuCmd: updateMemberRole / PUT /api/shoplists/:shopListId/members/:userId
- **Endpoint Name:** updateMemberRole
- **Route:** PUT /api/shoplists/:shopListId/members/:userId
- **Profile Required:** OWNER
- **dtoIn:**
  - `role` (string, required, 'member' or 'owner')
- **dtoOut:**
  - Member object

#### uuCmd: removeMember / DELETE /api/shoplists/:shopListId/members/:userId
- **Endpoint Name:** removeMember
- **Route:** DELETE /api/shoplists/:shopListId/members/:userId
- **Profile Required:** OWNER (or user removing themselves)
- **dtoIn:** None (shopListId and userId from URL)
- **dtoOut:**
  - `success` (boolean)

## Validation

All input data is validated against DTO schemas before processing:
- Type validation
- Required field validation
- Length constraints
- Format validation (email, ObjectId)
- Enum validation

Validation errors are returned in the `uuAppErrorMap` with detailed field-level error messages.

## Authorization

Authorization is enforced at the middleware level:
- `protect` - Verifies JWT token and sets AUTHENTICATED profile
- `checkMember` - Verifies user is a member of the shop list (MEMBER or OWNER profile)
- `checkOwner` - Verifies user is an owner of the shop list (OWNER profile)

Profile hierarchy ensures that higher-level profiles inherit permissions from lower-level profiles.

