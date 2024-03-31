const mongoose=require("mongoose")

const appointmentSchema= new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    doctorId:{
        type:String,
        required:true,
    },
   
    doctorInfo:{
        type:String,
        required:true,
    },
    userInfo:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:[true,"First Name Is Required"]
    },
    lastName:{
        type:String,
        required:[true,"Last Name Is Required"]
    },
    phone:{
        type:String,
        required:[true,"Phone Is Required"]
    },
    date:{
        type:Object,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    time:{
        type:Object,
        required:true,
    },


},{timestamps:true})

const appointmentModel= mongoose.model("appointments",appointmentSchema)
module.exports= appointmentModel