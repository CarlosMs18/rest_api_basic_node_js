const jwt = require('jsonwebtoken')
const generarJWT = (userId= '') => {
    
   /*  return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    }) */
    return new Promise( (resolve, reject) => {

        const payload = { userId };

        const token = jwt.sign(payload,process.env.SECRETORPRIVATEKEddy,{
            expiresIn:'4h'
        })

        if(!token){
            reject( 'No se pudo generar el token' )
        }else{
            resolve( token );
        }

      

    })
 
}


module.exports = {generarJWT}