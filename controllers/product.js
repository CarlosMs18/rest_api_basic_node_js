const {validationResult} = require('express-validator')
const Product = require('../models/products')
const User = require('../models/user')
exports.createProduct = async(req,res, next) => {

    const name = req.body.name
    const price = req.body.price
    const description = req.body.description

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation failed')
        error.statusCode = 401
        error.data = errors.array()
        next(error)
        return
    }

    const user = await User.findById(req.userId)
    
    if(!user){
        const error = new Error('Ha ocurrido un problema inesperado')
        error.statusCode = 500
        next(error)
        return
    }

try {
    const product = new Product({
        name,
        price,
        description,
        owner : user
    })
    await product.save()

    user.products.push(product._id)
    await user.save()
    
    res.status(201).json({msg : 'Product Created!', product : product._id})
} catch (error) {
    error.statusCode = 500
    next(error); 
    return
    }

}



