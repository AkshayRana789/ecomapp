const express = require('express');
const service = require('../controllers/userController');

const router = express.Router();

router.post('/register',service.registerUsers);
router.post('/login',service.loginUsers);

module.exports = router;