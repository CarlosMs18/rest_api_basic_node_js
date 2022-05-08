const path = require('path')
const fs = require('fs')
const User = require('../models/user')
const Product = require('../models/products')
const subirArchivo= require('../helpers/subir-archivo')
exports.updatedUpload = async(req, res, next) => {
    const coleccion = req.params.coleccion
    const id = req.params.id

    let model;
    switch (coleccion) {
        case 'usuarios':
            model = await User.findById(id)
            if(!model){
                const error = new Error('El usuario no existe!')
                error.statusCode = 404
                next(error)
                return
            }
           
            break;

        case 'productos':
            model = await Product.findById(id)
            if(!model){
                const error = new Error('El usuario no existe!')
                error.statusCode = 404
                next(error)
                return
            }
            break;
        default:
            const error = new Error('Server Internal Error')
            error.statusCode = 500
            next(error)
            return        
    }
   
 
    
    try {
        const nombre = await subirArchivo(req.files,undefined,coleccion)
        
        if(model.img){
            const pathRoutes = path.join(__dirname, '../uploads',coleccion,model.img)
            if(fs.existsSync(pathRoutes)){
                fs.unlinkSync(pathRoutes)
            }
        }
        model.img = nombre;
        await model.save()
       res.json({message : 'Se ha subido la imagen correctamente'})
    } catch (err) {
        
        const error = new Error('Validation Failed')
        error.statusCode = 422
        error.data = err
        next(error)
        return
    }
    


    
}