const mongoose=require("mongoose")

const DoctorSchema=  new mongoose.Schema({
userId:{
    type:String,
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
email:{
    type:String,
    required:[true,"Email Is Required"]
},
webSite:{
    type:String,
},
address:{
    type:String,
    required:[true,"Address Is Required"]
},
specialization:{
    type:String,
    required:[true,"specialization Is Required"],
},
experience:{
    type:String,
    required:[true,"Experience is Required"],
},
feePerConsultation:{
    type:Number,
    required:[true, "Fee is Required"]
},
status:{
type:String,
default:"pending"
},
timings:{
    type:Object,
    required:[true,"Work Time Is Required"]
}




},{timestamps:true})

const doctorModel= mongoose.model("doctors",DoctorSchema)

module.exports=doctorModel