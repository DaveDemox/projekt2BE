const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { validateDto, validateQuery } = require('../middleware/validation');
const userDtos = require('../dto/user.dto');

router.use(protect); // All user routes require authentication

router.get('/', validateQuery(userDtos.getUsers.dtoIn), getUsers);
router.get('/:id', getUser);
router.put('/:id', validateDto(userDtos.updateUser.dtoIn), updateUser);

module.exports = router;
