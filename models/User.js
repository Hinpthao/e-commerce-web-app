const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required : true
    },
    role: {
        type: Number,
        default: 0
    },
    resetToken: {
        type : String,
        default : ''
    },
    expireToken: {
        type : Date,
        default: ''
    }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);

module.exports = User;