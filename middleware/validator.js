const { body, validationResult } = require('express-validator');

exports.signupValidator = [
    body('username')
        .not().isEmpty()
        .trim()
        .withMessage('All fields required'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email'),
    body('password')
        .isLength({ min : 8 })
        .withMessage('Password must be at least 8 characters long')
]
exports.signinValidator = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email'),
    body('password')
        .isLength({ min : 8 })
        .withMessage('Password must be at least 8 characters long')
]

exports.validatiorResult = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if(hasErrors){
        const firstError = result.array()[0].msg;

        return res.status(400).json({
            errorMessage : firstError
        })
        // console.log('hasErrors : ', hasErrors );
        // console.log('result : ', result)
    }

    next();
}