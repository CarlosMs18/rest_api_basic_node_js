const express = require('express')
const authRoutes = require('../routes/auth')
const productRoutes = require('../routes/product')
const uploadRoutes = require('../routes/uploads')
const cors = require('cors')
const {conexionDB} = require('../config/connection_db')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')


class Server{
    constructor(){
        this.app = express()
        this.PORT = process.env.PORT


        this.path = {
            auth : '/api/auth/',
            product : '/api/product/',
            upload : '/api/uploads/'
        }

       
        this.conectMongo()
        this.middlewares()
        this.routes()

        this.error()
    }
    
    async conectMongo(){
        await conexionDB()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true

        }))
       
    }

    routes(){
        this.app.use(this.path.auth, authRoutes)
        this.app.use(this.path.product,productRoutes)
        this.app.use(this.path.upload, uploadRoutes)
    }

    error(){
        this.app.use((error, req, res, next) => {
                
               const status = error.statusCode || 500
               const message = error.message || 'Server Internal error';
               const data = error.data;
               res.status(status).json({ message: message, data: data });
          });
    }

    listen(){
        this.app.listen(this.PORT, () =>{
            console.log(`Conectado desde el puerto ${this.PORT}`)
        })
    }

}

module.exports = Server


/* ykCSIxYhd0Yudc5k */