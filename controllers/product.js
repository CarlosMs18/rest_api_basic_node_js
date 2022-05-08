const {validationResult} = require('express-validator')
const Product = require('../models/products')
const User = require('../models/user')



exports.getProducts = async(req,res) => {
    const currentPage = Number(req.query.page) || 1
    const perPage = 2

  
   
    const [total, products] = await Promise.all([
        Product.find().countDocuments(),
        Product.find().skip((currentPage - 1)*perPage).limit(perPage)
    ])

    res.status(201).json({total, products})
  
}



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




exports.updatedProduct =  async(req,res, next) => {
    const name = req.body.name
    const price = req.body.price
    const description = req.body.description
    const productId = req.params.productId

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation Failed')
        error.statusCode = 401,
        error.data = errors.array()
        next(error)
        return
    }
    
    const userOwner = await Product.findOne({owner : req.userId})
    if(!userOwner){
        const error = new Error('Ha ocurrido algo inesperado')
        error.statusCode = 500,
        next(error)
        return
    }

    

    try {
        const product = await Product.findById(productId)
        if(!product){
        const error = new Error('No se encuentra dicho producto')
        error.statusCode = 404
        next(error)
        return
        }

        product.name = name
        product.price =price 
        product.description = description
        await product.save()
        res.status(201).json({msg:'Product Updtaed!'})
        
    } catch (error) {
        error.statusCode = 500
        next(error)
        return
    }
}


exports.deleteProduct = async(req, res,next) => {
    const productId = req.params.productId
    const product = await Product.findById(productId)
    if(!product){
        const error = new Error('Product Not Found')
        error.statusCode = 404
        next(error)
        return
    }

    const userOwner = await Product.findOne({owner : req.userId})
    if(!userOwner){
        const error = new Error('Ha ocurrido algo inesperado')
        error.statusCode = 500,
        next(error)
        return
    }

    try {
        await Product.findByIdAndRemove(productId)
        const user = await User.findById(req.userId)
       
        user.products.pull(productId)
        await user.save()
    
        res.status(200).json({message : 'Product Eliminated Satisfactoriamente!'})
    } catch (error) {
        error.statusCode = 500
        next(error)
        return
    }
}


