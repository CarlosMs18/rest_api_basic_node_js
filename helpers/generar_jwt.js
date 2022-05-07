const jwt = require('jsonwebtoken')
const generarJWT = async(userId= '') => {
    
    const payload = {userId}
    try {
       const tokenGenerated=  jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn : '1h'
        })

        return tokenGenerated

    } catch (error) {
        console.log(error)
    }
}


module.exports = {generarJWT}