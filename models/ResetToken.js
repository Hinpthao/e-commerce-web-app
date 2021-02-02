const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    resettoken: { 
        type: String, 
        required: true 
    }
}, { timestamps : true });


const ResetToken = mongoose.model('ResetToken', resetTokenSchema);

module.exports =  ResetToken;