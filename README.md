# Shopping List App - Backend API

Backend API for a shopping list application with user authentication and role-based permissions (member/owner).

**Note:** This implementation focuses on API design, DTO validation, and authorization structure. Application logic (database operations, business logic) is not yet implemented. Endpoints validate input data, check authorization, and return the received input data along with mock output data.

## Features

- ✅ Application profiles (actors) with hierarchical permissions
- ✅ DTO schemas for all endpoints (input/output validation)
- ✅ Input data validation middleware
- ✅ Profile-based authorization middleware
- ✅ Standardized response format (dtoIn, dtoOut, error information)
- ⏳ Application logic (database operations, business logic) - **Not yet implemented**

Endpoints currently:
- Validate input data against DTO schemas
- Check authorization based on application profiles
- Return received input data (dtoIn) in responses
- Return mock output data (dtoOut) for testing
- Return error information in standardized format

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopping-list-app
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
```

3. ~~Make sure MongoDB is running on your system~~ (Not required - application logic not implemented)

4. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ name, email, password }`
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
- `GET /api/auth/me` - Get current user (requires authentication)

### Users

- `GET /api/users` - Get all users (searchable with `?search=name`)
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user (only own profile)

### Shop Lists

- `GET /api/shoplists` - Get all shop lists for current user
  - Query: `?archived=true/false` to filter
- `GET /api/shoplists/:id` - Get single shop list (must be member)
- `POST /api/shoplists` - Create new shop list (becomes owner)
  - Body: `{ name }`
- `PUT /api/shoplists/:id` - Update shop list (must be member)
  - Body: `{ name?, archived? }`
- `DELETE /api/shoplists/:id` - Delete shop list (must be owner)

### Shop List Items

- `POST /api/shoplists/:id/items` - Add item to shop list (must be member)
  - Body: `{ name }`
- `PUT /api/shoplists/:id/items/:itemIndex` - Update item (must be member)
  - Body: `{ name?, completed? }`
- `DELETE /api/shoplists/:id/items/:itemIndex` - Delete item (must be member)

### Shop List Members

- `GET /api/shoplists/:shopListId/members` - Get all members (must be member)
- `POST /api/shoplists/:shopListId/members` - Add member (must be owner)
  - Body: `{ userId, role? }` (role defaults to 'member')
- `PUT /api/shoplists/:shopListId/members/:userId` - Update member role (must be owner)
  - Body: `{ role: 'member' | 'owner' }`
- `DELETE /api/shoplists/:shopListId/members/:userId` - Remove member (must be owner, or user removing themselves)

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Roles

- **Owner**: Can manage shop list settings, add/remove members, change roles, and delete the shop list
- **Member**: Can view and edit items in the shop list, but cannot manage members or delete the list

## Database Schema

### Users
- `id`: ObjectId
- `name`: String (indexed, unique for search)
- `createdAt`: Date

### Auth
- `id`: ObjectId
- `userId`: ObjectId (references User)
- `email`: String (indexed, unique)
- `passwordHash`: String
- `lastLogin`: Date

### ShopList
- `id`: ObjectId
- `name`: String (indexed)
- `archived`: Boolean (indexed)
- `createdAt`: Date
- `items`: Array of { name, completed, addedAt }

### UserShopList
- `id`: ObjectId
- `userId`: ObjectId (references User)
- `shopListId`: ObjectId (references ShopList)
- `role`: String ('member' | 'owner')
- `addedAt`: Date

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message"
}
```

Success responses include:
```json
{
  "success": true,
  "data": { ... }
}
```

