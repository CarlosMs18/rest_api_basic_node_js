const path = require('path')
const fs = require('fs')
const User = require('../models/user')
const Product = require('../models/products')
const subirArchivo= require('../helpers/subir-archivo')
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

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

exports.uplodasCloudinary = async(req, res , next) => {
    const extensionesValidas = ['png','jpg','jpeg','gif']
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


        const {name} = req.files.archivo
        const nombreRecortado = name.split('.')
        const extension = nombreRecortado[nombreRecortado.length - 1]
        if(!extensionesValidas.includes(extension)){
            const error = new Error(`Solo se permiten los archivos con estas extensiones ${extensionesValidas}`)
            error.statuCode = 422
            next(error)
            return
        }
      


        const {tempFilePath} = req.files.archivo
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
        
        if(model.img){
            const imgModel = model.img.split('/')
            const imagenNombre = imgModel[imgModel.length -1]
            
            const [publicIds]= imagenNombre.split('.')
            cloudinary.uploader.destroy(publicIds)
        }

        model.img = secure_url
        await model.save()
    
        res.status(201).json({msg:'Imagen Actualizada con exito!'})
    

   

}