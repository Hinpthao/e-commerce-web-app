const { findById } = require('../models/User');
const User = require('../models/User');

exports.update = async (req, res) => {
    const { userId } = req.params;
    const data = req.body
    
    try { 
        await User.findOneAndUpdate( { _id : userId } , data);
    
        const user = await User.findById(userId);

        res.json({
            successMessage : 'Update profile successfully',
            user
        })
    } catch(err){
        res.status(400).json({
            errorMessage : 'Try again later',
        })
    }

}

exports.getAllCustomers = async (req, res) => {
    try { 
        const customers = await User.find({ role: 0 });

        res.json({
            customers
        })
    } catch(err){
        res.status(400).json({
            errorMessage : 'Try again later',
        })
    }

}