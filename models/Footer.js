const mongoose = require('mongoose');

const FooterSchema = new mongoose.Schema({
    nameEnterprise: {
        type: String,
    },
    description : {
        type : String,
        trim : true,
    },
    email : {
        type: String,
        trim: true,
    },
    phone: {
        type: Number,
    },
    address : {
        type: String,
        trim: true,
    },
    linkFb : {
        type: String,
    },
    linkIg : {
        type: String,
    }
}, { timestamps: true });

const Footer = mongoose.model('Footer', FooterSchema);

module.exports = Footer;