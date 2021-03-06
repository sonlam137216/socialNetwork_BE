const express = require('express');
const router = express.Router();
const authCtrl = require('../controller/authCtrl');
const verifyToken = require('../middleware/auth');

router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);
router.post('/token', authCtrl.token);
router.post('/logout', verifyToken, authCtrl.logout);

module.exports = router;
