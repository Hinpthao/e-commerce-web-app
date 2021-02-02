const Footer = require('../models/Footer');

exports.get = async (req, res) => {
    try{ 
        const footer = await Footer.find({});

        res.json({
            footer
        })
    } catch(err) {
        res.status(500).json({
            errorMessage: 'Try again later'
        })
    }
}

exports.create = async (req, res) => {
    const { nameEnterprise,
        description,
        email,
        phone ,
        address ,
        linkFb,
        linkIg, } = req.body;

    try {
        let footer = new Footer();
        footer.nameEnterprise = nameEnterprise;
        footer.description = description;
        footer.email = email;
        footer.phone = phone;
        footer.address = address;
        footer.linkFb = linkFb;
        footer.linkIg = linkIg;
        
        await footer.save();

        res.json({
            successMessage : `was created`,
            footer
        })

    } catch (err){
        console.log('Product controller error : ',err),
        res.status(500).json({
            errorMessage: err
        })
    }
}

exports.update = async (req, res) => {
    try{
        const id = req.params.id;
        console.log(req.body);

        const { nameEnterprise,
            description,
            email,
            phone ,
            address ,
            linkFb,
            linkIg, } = req.body;

        await Footer.findByIdAndUpdate(id, {
            nameEnterprise,
            description  ,
            email,
            phone,
            address,
            linkFb,
            linkIg 
        })

        const footer = await Footer.find({})

        res.json({ 
            successMessage: 'Footer successfully updated',
            footer
        })
    } catch(err){
        res.status(500).json({
            errorMessage: 'Failed',
            err
        })
    }
}