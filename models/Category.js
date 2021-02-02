const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
        type : String,
        required : true,
        trim : true,
        maxlength: 50,
        unique: true
    },
    slug: {
        type : String,
        required : true,
        trim : true,
        maxlength: 50
    },
    imageCategory: {
        type : String,
        required : true,
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;