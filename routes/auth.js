const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateDto } = require('../middleware/validation');
const authDtos = require('../dto/auth.dto');

router.post('/register', validateDto(authDtos.register.dtoIn), register);
router.post('/login', validateDto(authDtos.login.dtoIn), login);
router.get('/me', protect, getMe);

module.exports = router;
