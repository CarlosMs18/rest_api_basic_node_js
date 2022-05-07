const mongoose = require('mongoose')


const conexionDB = async() => {
        try {
            await mongoose.connect(process.env.MONGO_CNN,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log('Conexion Exitosa')
        } catch (error) {
            console.log(error)
        }
}

module.exports = {conexionDB}