const {v4 :uuidv4} = require('uuid')
const path = require('path')

module.exports =(files, extensionesValidas = ['png','jpg','jpeg','gif','pdf'], carpeta = '') => {

   
    return new Promise( (resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        // Validar la extension
        if ( !extensionesValidas.includes( extension ) ) {
             reject(`La extensión ${ extension } no es permitida - ${ extensionesValidas }`);
             return
        }
        
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( nombreTemp );
        });

    });
    

}