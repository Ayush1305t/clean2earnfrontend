const { default: mongoose } = require("mongoose");

const preRegistrationSchema=mongoose.Schema({
    first_name:{
        type:String,
        required:true,
        trim:true
    },
    last_name:{
        type:String,
        default:""
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    phoneNo:{
        type:Number,
        required:true,
    },
    reason:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    

})
const preRegistrationModel=mongoose.model("preRegistrationModel",preRegistrationSchema);
module.exports=preRegistrationModel;