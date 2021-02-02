const User = require('../models/User');
const ResetToken = require('../models/ResetToken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')
const jwt = require('jsonwebtoken');
const {jwtExpire, jwtSecret} = require('../config/keys');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_APIKEY
    }
}))

exports.signupController = async (req, res) => {
    const { username, email, password } = req.body;

    try{
        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({
                errorMessage : "Email already exists"
            })
        }

        const newUser = new User();
        newUser.username = username;
        newUser.email = email;

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        res.json({
            successMessage: "Registration success. Please signin."
        });

    } catch (err) {
        console.log('signup controller error : ', err);
        res.status(500).json({
            errorMessage: "Server error."
        })
    }
}
exports.signinController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                errorMessage: "Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                errorMessage : "Invalid credentials"
            })
        }

        const payload = {
            user : {
                _id: user._id
            }
        }

        jwt.sign(payload, jwtSecret, { expiresIn : jwtExpire}, (err, token) => {
            if(err) console.log('jwtError : ', err)
            const { _id, username, email, role} = user;

            res.json({
                token,
                user: { _id, username, email, role }
            })
        })
    } catch (err) {
        console.log('Signin controller error : ' , err);
        res.status(500).json({
            errorMessage : 'Server error'
        })
    }
}

exports.forgotPassword = (req, res) => {
    if(req.body.email === ''){
        res.status(400).json({ errorMessage: 'Email required' })
    }

    User.findOne({ email: req.body.email })
    .then( async (user) => {
        if(user === null){
            res.status(403).json({ errorMessage: 'Email not in database' })
        } else {
            const token = crypto.randomBytes(20).toString('hex');
            await User.findOneAndUpdate({ email: req.body.email }, {
                resetToken : token, 
                expireToken : Date.now() + 3600000
            })
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.EMAIL_ADDRESS}`,
                    pass: `${process.env.EMAIL_PASSWORD}`
                }
            })
            
            const mailOptions = {
                from: 'htpt18081999@gmail.com',
                to: `${user.email}`,
                subject: 'Link To Reset Password',
                text:
                'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                + `${process.env.CLIENT_URL}/reset-password/${token}\n\n`
                + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
            };
            
            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error('there was an error: ', err);
                } else {
                    console.log('here is the res: ', response);
                    res.status(200).json({ successMessage: 'Check your mail' });
                }
            });
        }
    })
}
exports.updateNewPassword = async (req, res) => {
    const user = await User.findOne({ resetToken: req.body.token })
    if(!user){
        res.status(403).json({ errorMessage: 'Token not found in database' })
    } else {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        
        await user.update({
            password,
            resetToken : '', 
            expireToken : null
        })
        
        res.json({
            successMessage: 'Password updated successfully'
        })
    }

}