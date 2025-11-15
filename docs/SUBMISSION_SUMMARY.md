# Homework Submission Summary

## ✅ Requirements Checklist

### 1. Design Application Profiles Based on Actors
**Status:** ✅ Complete
**Location:** `config/profiles.js`

**Profiles Defined:**
- **UNAUTHENTICATED** - Base profile for unauthenticated users
- **AUTHENTICATED** - Base profile for authenticated users (inherits UNAUTHENTICATED)
- **MEMBER** - Profile for shop list members (inherits AUTHENTICATED, UNAUTHENTICATED)
- **OWNER** - Profile for shop list owners (inherits MEMBER, AUTHENTICATED, UNAUTHENTICATED)

**Documentation:** `docs/PROFILES.md`

---

### 2. Design Input and Output Data for Individual API Endpoints (uuCmd)
**Status:** ✅ Complete
**Location:** `dto/` directory

**DTO Files:**
- `dto/auth.dto.js` - Authentication endpoints (register, login, getMe)
- `dto/user.dto.js` - User management endpoints (getUsers, getUser, updateUser)
- `dto/shopList.dto.js` - Shop list endpoints (CRUD operations, items)
- `dto/userShopList.dto.js` - Member management endpoints

**Each endpoint has:**
- `dtoIn` - Input data schema with validation rules
- `dtoOut` - Output data schema

**Documentation:** `docs/API_DESIGN.md`

---

### 3. Create Application Using Node.js and Express.js
**Status:** ✅ Complete
**Location:** `server.js`, `routes/`, `controllers/`

**Technology Stack:**
- Node.js
- Express.js
- Custom validation middleware
- Profile-based authorization

---

### 4. Identified Endpoints (uuCmd)
**Status:** ✅ Complete

**Authentication Endpoints:**
- **uuCmd:** `register` - `POST /api/auth/register` - Register new user
- **uuCmd:** `login` - `POST /api/auth/login` - Login user
- **uuCmd:** `getMe` - `GET /api/auth/me` - Get current user

**User Endpoints:**
- **uuCmd:** `getUsers` - `GET /api/users` - Get all users (searchable)
- **uuCmd:** `getUser` - `GET /api/users/:id` - Get single user
- **uuCmd:** `updateUser` - `PUT /api/users/:id` - Update user

**Shop List Endpoints:**
- **uuCmd:** `getShopLists` - `GET /api/shoplists` - Get all shop lists for user
- **uuCmd:** `getShopList` - `GET /api/shoplists/:id` - Get single shop list
- **uuCmd:** `createShopList` - `POST /api/shoplists` - Create shop list
- **uuCmd:** `updateShopList` - `PUT /api/shoplists/:id` - Update shop list
- **uuCmd:** `deleteShopList` - `DELETE /api/shoplists/:id` - Delete shop list

**Item Endpoints:**
- **uuCmd:** `addItem` - `POST /api/shoplists/:id/items` - Add item
- **uuCmd:** `updateItem` - `PUT /api/shoplists/:id/items/:itemIndex` - Update item
- **uuCmd:** `deleteItem` - `DELETE /api/shoplists/:id/items/:itemIndex` - Delete item

**Member Management Endpoints:**
- **uuCmd:** `getMembers` - `GET /api/shoplists/:shopListId/members` - Get members
- **uuCmd:** `addMember` - `POST /api/shoplists/:shopListId/members` - Add member
- **uuCmd:** `updateMemberRole` - `PUT /api/shoplists/:shopListId/members/:userId` - Update member role
- **uuCmd:** `removeMember` - `DELETE /api/shoplists/:shopListId/members/:userId` - Remove member

---

### 5. Validation of Input Data (dtoIn)
**Status:** ✅ Complete
**Location:** `middleware/validation.js`

**Validation Features:**
- Type validation (string, number, boolean, array, object, date)
- Required field validation
- Length constraints (minLength, maxLength)
- Format validation (email, ObjectId)
- Enum validation
- Query parameter validation

**All endpoints use:** `validateDto()` or `validateQuery()` middleware

---

### 6. Authentication and Authorization Against Application Profiles
**Status:** ✅ Complete
**Location:** `middleware/auth.js`

**Authorization Middleware:**
- `protect` - Verifies authentication (sets AUTHENTICATED profile)
- `checkMember` - Verifies MEMBER or OWNER profile for shop list
- `checkOwner` - Verifies OWNER profile for shop list
- `checkShopListProfile()` - Generic profile checker

**Profile Hierarchy:** Implemented with inheritance (higher profiles inherit lower profile permissions)

---

### 7. Endpoints Return Received Input Data and Error Information
**Status:** ✅ Complete
**Location:** `utils/response.js`, all controllers

**Response Format:**
```json
{
  "success": true/false,
  "dtoIn": { ... },  // Always included when input data exists
  "dtoOut": { ... }, // On success
  "uuAppErrorMap": { // On error
    "error_key": {
      "message": "Error message",
      "paramMap": {
        "errors": [ ... ]  // For validation errors
      }
    }
  }
}
```

**All endpoints:**
- ✅ Return `dtoIn` in responses
- ✅ Use `uuAppErrorMap` format for errors
- ✅ Include error information in `paramMap`

---

## 📋 For Submission Template

### Profiles Section:
1. **UNAUTHENTICATED**
   - Description: Base profile for unauthenticated users
   - Permissions: Access public endpoints (register, login)

2. **AUTHENTICATED**
   - Description: Base profile for authenticated users
   - Permissions: User management, create shop lists
   - Inherits: UNAUTHENTICATED

3. **MEMBER**
   - Description: Shop list member
   - Permissions: View/edit items, view members
   - Inherits: AUTHENTICATED, UNAUTHENTICATED

4. **OWNER**
   - Description: Shop list owner
   - Permissions: All member permissions + manage members, delete lists
   - Inherits: MEMBER, AUTHENTICATED, UNAUTHENTICATED

### Endpoints (uuCmd) Section:

For each endpoint, document:
- **uuCmd Name** (e.g., `register`)
- **Endpoint Name** (e.g., `register`)
- **Route** (e.g., `POST /api/auth/register`)
- **Profile Required** (e.g., UNAUTHENTICATED)
- **dtoIn** (input fields with types and constraints)
- **dtoOut** (output fields with types)

See `docs/API_DESIGN.md` for complete endpoint specifications.

---

## 📁 Project Structure

```
projekt2/
├── config/
│   └── profiles.js          # Application profiles
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── shopListController.js
│   └── userShopListController.js
├── dto/
│   ├── auth.dto.js          # Authentication DTOs
│   ├── user.dto.js          # User DTOs
│   ├── shopList.dto.js      # Shop list DTOs
│   └── userShopList.dto.js  # Member management DTOs
├── middleware/
│   ├── auth.js              # Authorization middleware
│   └── validation.js        # Input validation middleware
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── shopLists.js
│   └── userShopLists.js
├── utils/
│   └── response.js          # Standardized response handler
├── docs/
│   ├── API_DESIGN.md        # Complete API documentation
│   ├── PROFILES.md          # Profiles documentation
│   └── SUBMISSION_SUMMARY.md
├── server.js                # Main server file
└── package.json
```

---

## ✅ Verification

All requirements met:
- ✅ Application profiles designed
- ✅ Input/output data designed for all endpoints
- ✅ Node.js/Express.js application created
- ✅ All endpoints identified and implemented
- ✅ Input data validation implemented
- ✅ Authentication and authorization implemented
- ✅ Endpoints return dtoIn and use uuAppErrorMap format
- ✅ Application logic NOT implemented (as required)

