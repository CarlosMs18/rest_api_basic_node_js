const jwt = require('jsonwebtoken')
const generarJWT = (userId) => {
    
    const payload = {userId}
    try {
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn : '3h'
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = generarJWT