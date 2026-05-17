const express = require('express');
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const { register, login } = require('../validations/auth.validation');
const router = express.Router();

router.post('/register', validate(register), authController.register);
router.post('/login', validate(login), authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-tokens', authController.refreshTokens);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
