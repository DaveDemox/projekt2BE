const express = require('express');
const router = express.Router();
const {
  getShopLists,
  getShopList,
  createShopList,
  updateShopList,
  deleteShopList,
  addItem,
  updateItem,
  deleteItem
} = require('../controllers/shopListController');
const { protect, checkOwner, checkMember } = require('../middleware/auth');
const { validateDto, validateQuery } = require('../middleware/validation');
const shopListDtos = require('../dto/shopList.dto');

router.use(protect); // All shop list routes require authentication

router.get('/', validateQuery(shopListDtos.getShopLists.dtoIn), getShopLists);
router.post('/', validateDto(shopListDtos.createShopList.dtoIn), createShopList);
router.get('/:id', checkMember, getShopList);
router.put('/:id', checkMember, validateDto(shopListDtos.updateShopList.dtoIn), updateShopList);
router.delete('/:id', checkOwner, deleteShopList);

// Item routes
router.post('/:id/items', checkMember, validateDto(shopListDtos.addItem.dtoIn), addItem);
router.put('/:id/items/:itemIndex', checkMember, validateDto(shopListDtos.updateItem.dtoIn), updateItem);
router.delete('/:id/items/:itemIndex', checkMember, deleteItem);

module.exports = router;
