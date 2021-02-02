const Product = require('../models/Product');
const Category = require('../models/Category');
const fs = require('fs');
var ObjectId = require('mongoose').Types.ObjectId; 

exports.create = async (req, res) => {
    const filename = [];
    for(var i in req.files){
        filename.push(req.files[i].filename)
    }
    const { productName, productDesc, productPrice, productCategory, productQuantity, productNew, percDiscount, slug } = req.body;

    try {
        const prod = await Product.findOne({ slug });
        if(prod) {
            return res.status(400).json({
                errorMessage : "Slug already exists"
            })
        }

        let product = new Product();
        product.productImages = filename;
        product.productName = productName;
        product.productDesc = productDesc;
        product.productPrice = productPrice;
        product.productCategory = productCategory;
        product.productQuantity = productQuantity;
        product.productNew = productNew;
        product.percDiscount = percDiscount;
        product.slug = slug;
        product.numOfPurchs = 0;

        await product.save();

        const pro = await Product.findOne({ slug : slug })

        res.json({
            successMessage : `${productName} was created`,
            product
        })

    } catch (err){
        console.log('Product controller error : ',err),
        res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}

exports.readAll = async (req, res) => {
    try {
        var page = req.query.page;
        var limit = req.query.limit;

        if(page){
            page = parseInt(page);
            limit = parseInt(limit);
            var skip = (page - 1) * limit;

            const products = await Product.find({})
                .populate('productCategory', 'category')
                .skip(skip)
                .limit(limit)
                .sort({createdAt: -1})
            
            const totalProducts = await Product.countDocuments();
            
            const _pagination = {
                page: page,
                limit: limit,
                totalProducts: totalProducts
            };

            res.json({ 
                products,
                _pagination 
            })
        } else {
            const products = await Product.find({}).populate('productCategory', 'category').sort({createdAt: -1})
    
            res.json({ products })
        }
    } catch (err){
        console.log('Product controller error : ',err),
        res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}

exports.getProductsSale = async (req, res) => {
    try {
        var page = req.query.page;
        var limit = req.query.limit;

        if(page){
            page = parseInt(page);
            limit = parseInt(limit);
            var skip = (page - 1) * limit;

            const products = await Product.find({})
                .where('percDiscount').gt(0)
                .populate('productCategory', 'category')
                .skip(skip)
                .limit(limit)
                .sort({createdAt: -1})

            const totalProducts = await Product.where('percDiscount').gt(0).countDocuments();
            
            const _pagination = {
                page: page,
                limit: limit,
                totalProducts: totalProducts
            };

            res.json({ 
                products,
                _pagination 
            })
        } else {
            const products = await Product.find({})
                .where('percDiscount').gt(0)
                .populate('productCategory', 'category')
                .sort({createdAt: -1})

            res.json({ products })
        }
    } catch (err){
        console.log('Product controller error : ',err),
        res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}

exports.getProductsBestSeller = async (req, res) => {
    try {
        var page = req.query.page;
        var limit = req.query.limit;

        if(page){
            page = parseInt(page);
            limit = parseInt(limit);
            var skip = (page - 1) * limit;

            const products = await Product.find({})
                .populate('productCategory', 'category')
                .sort({numOfPurchs: -1})
                .skip(skip)
                .limit(limit)

            const totalProducts = await Product.countDocuments();
            
            const _pagination = {
                page: page,
                limit: limit,
                totalProducts: totalProducts
            };

            res.json({ 
                products,
                _pagination 
            })
        } else {
            const products = await Product.find({})
                .where('percDiscount').gt(0)
                .populate('productCategory', 'category')
                .sort({createdAt: -1})

            res.json({ products })
        }
    } catch (err){
        console.log('Product controller error : ',err),
        res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}
exports.getProductsNew = async (req, res) => {
    try {
        var page = req.query.page;
        var limit = req.query.limit;

        if(page){
            page = parseInt(page);
            limit = parseInt(limit);
            var skip = (page - 1) * limit;

            const products = await Product.find({ productNew : true })
                .populate('productCategory', 'category')
                .skip(skip)
                .limit(limit)
                .sort({createdAt: -1})

            const totalProducts = await Product.countDocuments();
            
            const _pagination = {
                page: page,
                limit: limit,
                totalProducts: totalProducts
            };

            res.json({ 
                products,
                _pagination 
            })
        } else {
            const products = await Product.find({ productNew : true })
                .populate('productCategory', 'category')
                .sort({createdAt: -1})
    
            res.json({ products })
        }
    } catch (err){
        console.log('Product controller error : ',err),
        res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}

exports.getProductsByCategory = async (req, res) => {
    try {
        var page = req.query.page;
        var limit = req.query.limit;
        var { categorySlug } = req.params

        if(page){
            page = parseInt(page);
            limit = parseInt(limit);
            var skip = (page - 1) * limit;

            const cat = await Category.findOne({ slug : categorySlug })

            const products = await Product.find({ productCategory : ObjectId(cat._id) })
                .populate('productCategory', 'category')
                .skip(skip)
                .limit(limit)
                .sort({createdAt: -1})
            
            const totalProducts = await Product.countDocuments({ 'productCategory.slug' : categorySlug });
            
            const _pagination = {
                page: page,
                limit: limit,
                totalProducts: totalProducts
            };

            res.json({ 
                products,
                _pagination 
            })
        } else {
            const products = await Product.find({ productCategory : ObjectId(cat._id) })
                .populate('productCategory', 'category')
                .sort({createdAt: -1})
    
            res.json({ products })
        }
    } catch (err){
        console.log('Product controller error : ',err),
        res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}

exports.search = async (req, res) => {
    try {
        var {page} = req.query;
        var {limit} = req.query;
        var {q} = req.query;

        if(page){
            page = parseInt(page);
            limit = parseInt(limit);
            var skip = (page - 1) * limit;

            const products = await Product.find({
                $text: {$search: q}
            })
                .populate('productCategory', 'category')
                .skip(skip)
                .limit(limit)
                .sort({createdAt: -1})
            
            const _pagination = {
                page: page,
                limit: limit,
                totalProducts: products.length
            };

            res.json({ 
                products ,
                _pagination 
            })
        } else {
            const products = await Product.find({ productCategory : ObjectId(cat._id) })
                .populate('productCategory', 'category')
                .sort({createdAt: -1})
    
            res.json({ products })
        }
    } catch (err){
        console.log('Product controller error : ',err),
        res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        
        for(var i in deletedProduct.productImages){
            fs.unlink(`uploads/${deletedProduct.productImages[i]}`, err => {
                if(err) throw err;
                console.log('Image successfully deleted from filesystem', deletedProduct.productImages[i])
            })
        }

        res.json(deletedProduct)
    } catch (err){
        console.log('Product controller error : ',err),
        res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}

exports.update = async (req, res) => {
    try {
        const filename = [];
        const productId = req.params.productId;

        if(req.files){
            for(var i in req.files){
                filename.push(req.files[i].filename)
            }        
        }
        const { productName, 
            productDesc, 
            productPrice, 
            productCategory, 
            productQuantity, 
            productNew,
            imageDelete,
            productImages,
            percDiscount,
            slug,
            numOfPurchs } = req.body;

        const oldProduct = await Product.findById(productId)

            for(var i of oldProduct.productImages){
                fs.unlink(`uploads/${i}`, err => {
                    if(err) throw err;
                    console.log('Image successfully deleted from filesystem', i)
                })
            }

        await Product.findByIdAndUpdate(productId, {
            productName,
            productDesc,
            productPrice,
            productCategory,
            productQuantity,
            productNew,
            productImages : filename,
            percDiscount,
            slug,
            numOfPurchs
        });  

        res.json({
            successMessage: "Product successfully updated"
        })

    } catch (err){
        console.log('Product controller error : ',err),
        res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}

exports.getProductDetail = async (req, res) => {
    try{
        var slug = req.params.productSlug;

        const product = await Product.findOne({ slug })

        res.json({ 
           product
         })
    } catch(err) {
        console.log('Product controller error : ',err)
        res.status(500).json({
            errorMessage: 'Try again later'
        })
    }
}

