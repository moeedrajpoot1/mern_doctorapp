const mongoose=require("mongoose")


const userSchema= new mongoose.Schema({

name:{
    type:String,
    required:[true,"Name IS Required"]
},
email:{
    type:String,
    required:[true,"Email IS Required"]
},
password:{
    type:String,
    required:[true,"Password IS Required"]
},
isAdmin:{
    type:Boolean,
    default:false,
},
isDoctor:{
    type:Boolean,
    default:false
},
notification:{
    type:Array,
    default:[]
},
seen:{
    type:Array,
    default:[]
}



},{timestamps:true})



module.exports= mongoose.model("user",userSchema)