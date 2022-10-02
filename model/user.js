const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name : {
        type:String ,
        required: true,
        trim :true,
        lowercase : true,

        minlength :3,
        maxlength : 20,

        unique : true,
        // validation :function(value){
        //     if(val)
        // }
    },

    email :{
        type :String ,
        required : true,
        trim :true ,

        validation :function(value){
            if(!validator.isEmail(value)){
                throw ("email is not valid");

            }

        }
    },

    password: {
        type : String ,
        required : true,
        trim :true ,
        minlength : 4,
        maxlength : 255,
        validation :function(value){
            
    }},





})


const User = mongoose.model('User', userSchema);

module.exports = User;