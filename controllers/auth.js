const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const {generarJWT} = require('../helpers/generar_jwt')

exports.signUp = async(req,res, next) => {
    
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){

      const error = new Error('Validation Failed')
      error.statusCode = 422
      error.data = errors.array()
      
      next(error)
      return
     
    }
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
 
    
    const userExist = await User.findOne({email})
   
    if(userExist){
        const error = new Error('Validation Failed')
        error.statusCode = 422
        error.data = 'El email ya se encuentra en uso'
        next(error)
      
    }
   
    if(confirmPassword !== password){
        const error = new Error('Validation Failed')
        error.statusCode = 422
        error.data = 'Las contraseñas no coinciden!'
        next(error)
      
    }
    
   
    try {
        const salt = bcryptjs.genSaltSync()
        const hashPassword = bcryptjs.hashSync(password,salt)
    
        const user = new User({
            name,
            email,
            password : hashPassword,
            confirmPassword
        })
        
        await user.save()
        res.status(201).json({message : 'User Created!', userId : user._id})
    
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          
          next(err);   
    }
}


exports.login = async(req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    try {
        const userExist = await User.findOne({email})
        
        if(!userExist){
            const error = new Error('El usuario no existe')
            error.statusCode = 401
            next(error)
            return 
        }
        
        const equalPassword = bcryptjs.compareSync(password, userExist.password)
        if(!equalPassword){
            const error = new Error('El email o contraseña son incorrectos  ')
            error.statusCode = 401
            next(error)
            return
        }

        const token = await generarJWT(userExist._id)
        res.status(200).json({
            userId : userExist._id,
            token
        })
    } catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          
          next(err); 
    }
    


}

