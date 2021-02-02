const express = require('express');
const router = express.Router();
const { signupValidator, validatiorResult, signinValidator } = require('../middleware/validator');
const { signupController, signinController, forgotPassword, updateNewPassword} = require('../controllers/auth');

router.post('/signup', signupValidator, validatiorResult, signupController)
router.post('/signin', signinValidator, validatiorResult, signinController)
router.post('/reset-password', forgotPassword)
router.post('/update-new-password', updateNewPassword)

module.exports = router;