const {Schema, model} = require('mongoose')


const userSchema = Schema({
    name:{
        type : String,
        required : true
    },

    email: {
        type : String,
        required : true
    },

    password : {
        type : String,
        required: true
    },

    rol : {
        type : String,
        default : 'USER_ROLE',
        required : true
    },

    img : {
        type : String,
     
    },
    status :{
        type : Boolean,
        default : true
    }
})

module.exports = model('User',userSchema)