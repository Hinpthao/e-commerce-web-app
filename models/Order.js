const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    information: {
        _id : {
            type: String
        },
        fullname: {
            type: String,
            required : true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    items: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        required: true
    },
    delivered: {
        type: Boolean,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;