const Order = require('../models/Order');
const Product = require('../models/Product');

exports.create = async (req, res) => {
    const { information,
            items,
            total,
            paid,
            delivered,
            paymentMethod,
            confirmed } = req.body;

    try {
        let order = new Order();
        order.information = information;
        order.items = items;
        order.total = total;
        order.paid = paid;
        order.delivered = delivered;
        order.paymentMethod = paymentMethod;
        order.confirmed = confirmed;

        await order.save();

        for(var i = 0; i < items.length ; i++) {
            var prod = await Product.findById(items[i].product._id);
            await Product.findByIdAndUpdate(items[i].product._id, {
                productName : prod.productName, 
                productDesc : prod.productDesc, 
                productPrice : prod.productPrice, 
                productCategory : prod.productCategory, 
                productQuantity : prod.productQuantity, 
                productNew : prod.productNew,
                productImages : prod.productImages,
                percDiscount: prod.percDiscount,
                slug : prod.slug,
                numOfPurchs : items[i].quantity + prod.numOfPurchs
            })
        }

        res.json({
            successMessage : 'Order successully !',
            order
        })

    } catch (err){
        console.log('Order controller error : ',err),
        res.status(500).json({
            errorMessage: err
        })
    }
}

exports.getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;

    try{
        var { page } = req.query;
        var { limit } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        var skip = (page - 1) * limit;

        const orders = await Order.find({ 
            'information._id' : userId
        })
        .skip(skip)
        .limit(limit)
        .sort({createdAt: -1})
        
        const totalOrders = await Order.countDocuments({ 
            'information._id' : userId
        });
        
        const _pagination = {
            page: page,
            limit: limit,
            totalOrders: totalOrders
        };

        res.json({ 
            orders,
            _pagination 
        })

    } catch (err){
        console.log('Order controller error : ',err),
        res.status(500).json({
            errorMessage: err
        })
    }
}
exports.getOrders = async (req, res) => {
    try{
        var { page } = req.query;
        var { limit } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        var skip = (page - 1) * limit;

        const orders = await Order.find()
        .skip(skip)
        .limit(limit)
        .sort({createdAt: -1})
        
        const totalOrders = await Order.countDocuments({});
        
        const _pagination = {
            page: page,
            limit: limit,
            totalOrders: totalOrders
        };

        res.json({ 
            orders,
            _pagination 
        })

    } catch (err){
        console.log('Order controller error : ',err),
        res.status(500).json({
            errorMessage: err
        })
    }
}

exports.updateOrder = async (req, res) => {
    try {
        var { orderId } = req.params
        const data = req.body;
        
        await Order.findByIdAndUpdate(orderId, data)
        const order = await Order.findById(orderId)
        
        res.json({
            successMessage : 'Update order successfully',
            order
        })
    } catch (err) {
        console.log('Order controller error : ',err),
        res.status(500).json({
            errorMessage: err,
        })
    }
}