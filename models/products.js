const {Schema,model} = require('mongoose')


const productSchema = Schema({
    name : {
        type : String,
        required : true
    },

    price :{
        type : Number,
        default : 0.00
    },

    description : {
        type : String,
        required : true
    },
    img : {
        type : String
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{timestamps : true})


module.exports = model('Product',productSchema)