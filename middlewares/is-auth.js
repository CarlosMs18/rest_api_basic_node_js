const jwt = require('jsonwebtoken')
module.exports = (req, res , next) => {
    const tokenHeader = req.get('x-token')
    if(!tokenHeader){

        const error = new Error('No se ha proporcionado ningun token')
        error.statusCode = 401
        next(error)
        return
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(tokenHeader, process.env.SECRETORPRIVATEKEY)
    } catch (err) {
          err.statusCode = 500
          next(err); 
          return
    }

    if(!decodedToken){
        const error = new Error('Not Authenticated!')
        error.statusCode = 401
        next(error)
        return 
    }
    req.userId = decodedToken.userId

    next()
    
}