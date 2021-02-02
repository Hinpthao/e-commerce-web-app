const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    productImages: {
        type: Array,
        required : true,
    },
    productName : {
        type : String,
        required :  true,
        trim : true,
        maxlength: 60
    },
    productDesc : {
        type: String,
        trim: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productCategory : {
        type : ObjectId,
        ref: 'Category',
        required :  true
    },
    productQuantity : {
        type: Number,
        required : true
    },
    productNew : {
        type: Boolean,
        required : true
    },
    percDiscount : {
        type: Number,
        required : true
    },
    slug : {
        type: String,
        trim: true
    },
    numOfPurchs : {
        type: Number,
        trim: true
    },
}, { timestamps: true });

ProductSchema.index({
    productName : 'text'
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;