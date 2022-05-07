const {Schema,model} = require('mongoose')


const productSchema = Schema({
    name : {
        type : String,
        required : true
    },

    price :{
        type : Double,
        default : 0.00
    },

    description : {
        type : String,
        required : true
    },

    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{timestamps : true})


module.exports = model('Product',productSchema)