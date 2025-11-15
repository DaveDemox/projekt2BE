/**
 * Data Transfer Objects for Shop List endpoints
 */

// Get shop lists endpoint
const getShopListsDtoIn = {
  archived: {
    type: 'string',
    required: false,
    enum: ['true', 'false']
  }
};

const shopListItemDtoOut = {
  name: { type: 'string', required: true },
  completed: { type: 'boolean', required: true },
  addedAt: { type: 'date', required: true }
};

const shopListDtoOut = {
  id: { type: 'string', required: true },
  name: { type: 'string', required: true },
  archived: { type: 'boolean', required: true },
  createdAt: { type: 'date', required: true },
  items: {
    type: 'array',
    required: true,
    items: shopListItemDtoOut
  },
  role: {
    type: 'string',
    required: true,
    enum: ['member', 'owner']
  }
};

const getShopListsDtoOut = {
  shopLists: {
    type: 'array',
    required: true,
    items: shopListDtoOut
  }
};

// Get shop list endpoint
const getShopListDtoOut = shopListDtoOut;

// Create shop list endpoint
const createShopListDtoIn = {
  name: {
    type: 'string',
    required: true,
    minLength: 1,
    maxLength: 200,
    trim: true
  }
};

const createShopListDtoOut = shopListDtoOut;

// Update shop list endpoint
const updateShopListDtoIn = {
  name: {
    type: 'string',
    required: false,
    minLength: 1,
    maxLength: 200,
    trim: true
  },
  archived: {
    type: 'boolean',
    required: false
  }
};

const updateShopListDtoOut = shopListDtoOut;

// Delete shop list endpoint
const deleteShopListDtoOut = {
  success: { type: 'boolean', required: true }
};

// Add item endpoint
const addItemDtoIn = {
  name: {
    type: 'string',
    required: true,
    minLength: 1,
    maxLength: 200,
    trim: true
  }
};

const addItemDtoOut = shopListDtoOut;

// Update item endpoint
const updateItemDtoIn = {
  name: {
    type: 'string',
    required: false,
    minLength: 1,
    maxLength: 200,
    trim: true
  },
  completed: {
    type: 'boolean',
    required: false
  }
};

const updateItemDtoOut = shopListDtoOut;

// Delete item endpoint
const deleteItemDtoOut = shopListDtoOut;

module.exports = {
  getShopLists: { dtoIn: getShopListsDtoIn, dtoOut: getShopListsDtoOut },
  getShopList: { dtoIn: null, dtoOut: getShopListDtoOut },
  createShopList: { dtoIn: createShopListDtoIn, dtoOut: createShopListDtoOut },
  updateShopList: { dtoIn: updateShopListDtoIn, dtoOut: updateShopListDtoOut },
  deleteShopList: { dtoIn: null, dtoOut: deleteShopListDtoOut },
  addItem: { dtoIn: addItemDtoIn, dtoOut: addItemDtoOut },
  updateItem: { dtoIn: updateItemDtoIn, dtoOut: updateItemDtoOut },
  deleteItem: { dtoIn: null, dtoOut: deleteItemDtoOut }
};

