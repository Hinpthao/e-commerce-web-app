const Category = require('../models/Category');

exports.create = async (req, res) => {
    const { category, slug, imageCategory } = req.body;
    const filename = req.file.filename

    try {
        const categoryExist = await Category.findOne({ category });

        if(categoryExist) {
            return res.status(400).json({
                errorMessage : `${category} already exists` 
            })
        }
        let newCategory = new Category();
        newCategory.category = category;
        newCategory.slug = slug;
        newCategory.imageCategory = filename;

        newCategory = await newCategory.save();

        res.status(200).json({
            category: newCategory,
            successMessage : `${newCategory.category} was created`
        })
    } catch(err){
        console.log('Category create error : ', err);
        res.status(500).json({
            errorMessage : 'Please try again later'
        })
    }
}

exports.update = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        await Category.findByIdAndUpdate(id, data)

        const category = await Category.findById(id)
        
        res.status(200).json({
            successMessage : `Category successfully updated`,
            category
        })
    } catch(err){
        console.log('Category create error : ', err);
        res.status(500).json({
            errorMessage : 'Please try again later'
        })
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id)
       
        res.status(200).json({
            successMessage : `Category successfully deleted`,
            category
        })
    } catch(err){
        console.log('Category create error : ', err);
        res.status(500).json({
            errorMessage : 'Please try again later'
        })
    }
}

exports.readAll = async (req, res) => {
    try {
        const categories = await Category.find({  })

        res.status(200).json({
            categories 
        })

    } catch(err){
        console.log('Category read all error : ', err);
        res.status(500).json({
            errorMessage : 'Please try again later'
        })
    }
}