const express = require('express')
const authRoutes = require('../routes/auth')
const cors = require('cors')
const {conexionDB} = require('../config/connection_db')
const bodyParser = require('body-parser')


class Server{
    constructor(){
        this.app = express()
        this.PORT = process.env.PORT


        this.path = {
            auth : '/api/auth/'
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
       
    }

    routes(){
        this.app.use(this.path.auth, authRoutes)
    }

    error(){
        this.app.use((error, req, res, next) => {
                
               const status = error.statusCode || 500
               const message = error.message;
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