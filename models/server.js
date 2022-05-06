const express = require('express')


class Server{
    constructor(){
        this.app = express()
        this.PORT = process.env.PORT
    }

    listen(){
        this.app.listen(this.PORT, () =>{
            console.log(`Conectado desde el puerto ${this.PORT}`)
        })
    }

}

module.exports = Server