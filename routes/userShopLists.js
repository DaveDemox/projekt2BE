const express = require('express');
const router = express.Router();
const {
  getMembers,
  addMember,
  updateMemberRole,
  removeMember
} = require('../controllers/userShopListController');
const { protect, checkOwner, checkMember } = require('../middleware/auth');
const { validateDto } = require('../middleware/validation');
const userShopListDtos = require('../dto/userShopList.dto');

router.use(protect); // All routes require authentication

router.get('/:shopListId/members', checkMember, getMembers);
router.post('/:shopListId/members', checkOwner, validateDto(userShopListDtos.addMember.dtoIn), addMember);
router.put('/:shopListId/members/:userId', checkOwner, validateDto(userShopListDtos.updateMemberRole.dtoIn), updateMemberRole);
router.delete('/:shopListId/members/:userId', removeMember);

module.exports = router;
