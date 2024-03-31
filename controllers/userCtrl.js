const userSchema=require('../models/users.models')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const doctorModel=require('../models/doctor.model')
const appointmentModel=require('../models/appointment.models')
const usersModels = require('../models/users.models')
const moment= require("moment")
//////
const RegisterController=async(req,res)=>{
try {
 const {name,email,password}=req.body
 if(!name||!email||!password){
    return res.send({message:"Required All The Fields"})
 }

const checkEmail= await userSchema.findOne({email})
if(checkEmail){
    return res.send({message:"Email Already Registered"})
}
const hash= await bcrypt.hash(password,10)
const newUser=await new userSchema({name,email,password:hash}).save()
if(newUser){
    return res.send({Message:"User Saved Succesfull"})
}else{
    return res.send({Message:"User saved Failed"})
}


} catch (error) {
    console.log(error)
    
}


}
//////Login

const LoginController=async(req,res)=>{

    const {email,password}=req.body

const checkUser= await userSchema.findOne({email})
if(!checkUser){
    return res.status(200).send({Message:"User Not Found"})
}
const checkpass= await bcrypt.compare(password,checkUser.password)
const token= jwt.sign({id:checkUser._id},process.env.JWT_SECRET,{expiresIn:"1d"})
if (checkpass){
    return res.status(200).send({Message : "Login Successfull", token })
}else{
    return res.send({Message : "Invalid Credential"})
}



}
//////Auth Controller

const AuthController=async(req,res)=>{
    try {
        const user= await userSchema.findById({_id:req.body.userId})
        user.password=undefined
        if(!user){
            return res.status(200).send({Message:"User not Found"})
        }else{
            return res.status(200).send(
                {success:true,
                data:user})
        }


    } catch (error) {
        console.log(error)
    }

}

/////////           Apply Doctor CTRL          ///////////////
const applyDoctorController=async(req,res)=>{
try {
    const newDoctor= await doctorModel({...req.body,status:"pending"})
    await newDoctor.save()
    const adminUser= await userSchema.findOne({isAdmin:true})
    const notification= adminUser.notification
    notification.push({
        type:"apply-doctor-request",
        message:`${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
        data:{
            doctorId:newDoctor._id,
            name: newDoctor.firstName + " " + newDoctor.lastName,
            onClickPath:"/admin/doctors",
        }
    })
 await userSchema.findByIdAndUpdate(adminUser._id,{notification})
 res.status(200).send({Message:"DoCtor Account Applied"})





} catch (error) {
    console.log(error)
}


}
////////////doctor Notification controller////

const getAllNotificationController=async(req,res)=>{
try {
    
    const user= await userSchema.findOne({_id:req.body.userId})
    const seen=user.seen
    const notification= user.notification
    seen.push(...notification)
      
    user.notification=[]
    user.seen= notification
    const updatedUser= await user.save()
    res.status(200).send({Message:"All Notifications Marked As Read",
data:updatedUser})



} catch (error) {
    consolr.log(error)
    res.status(500).send({Message:"Error in Notification",error})
}
}
////// Delete Notifications//////////


const deleteAllNotificationController=async(req,res)=>{
try {
    const user = await userSchema.findById({_id:req.body.userId})
    user.notification=[]
    user.seen=[]
    const updatedUser= await user.save()
    updatedUser.password= undefined
    res.status(200).send({
        Message:"User Deleted Successfull",
        data:updatedUser,
    })







} catch (error) {
   console.log(error) 
  res.send(200).send({Message:"Unable To Delete Allnotifications"},error)

}
}

////Get Alll Doctors

const GetAllDoctors=async(req,res)=>{
try {
    const doctors = await doctorModel.find({status:"approved"})
    res.status(200).send({
        success:true,
        message:"Doctors List Fetched Successfully",
        data:doctors,
    })


} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"error While Fethcing Doctors"
    })
}
}

//////book Appointment Controller/////
const bookAppointmentcontroller=async(req,res)=>{
    try {
     req.body.date= moment(req.body.date,"DD-MM-YYYY").toISOString()
     req.body.time= moment(req.body.time,"HH:mm").toISOString()
     req.body.status="pending"
    
     const newAppointMent= new appointmentModel(req.body)
     await newAppointMent.save()

     const user = await userSchema.findOne({_id:req.body.doctorInfo.userId})
     user.notification.push({
        type:"New-Appointment-Request",
        message:` A New AppointMent Request from ${req.body.userInfo.name}`,
        onClickPath:"/user/appointments"
     })
     await user.save()
        res.status(200).send({
            success:true,
            message:"Appointment Book Successfully",
            

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error While Booking Appointment"
        })
    }

}

////////bookingAvailabilityController

const bookingAvailabilityController=async(req,res)=>{
try {
    const date= moment(req.body.date,"DD-MM-YYYY").toISOString()
    const FromTime=moment(req.body.time,"HH:mm").subtract(1,"hours").toISOString()
    const toTime=moment(req.body.time,"HH:mm").add(1,"hours").toISOString()
    
    const doctorId= req.body.doctorId
    const appointments= await appointmentModel.find({doctorId,date
        ,time:{
            $gte:FromTime,$lte:toTime
        }
    })
    if(appointments.length > 0){
        return res.status(200).send({
            message:"Appointment Not Available This time",
            success:true,
        })
    }else{
        return res.status(200).send({
            success:true,
            message:"Appointment Available"
        })
    }




} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error while booking"
    })
}









}


///////// Users Appointments Controllers

const userAppointmentController=async(req,res)=>{
try {
    const appointments= await appointmentModel.find({userId:req.body.userId})
    res.status(200).send({
        success:true,
        message:"Users Appointments SuccessFully",
        data:appointments,
    })

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Erro In users Appointments"
    })
}








}








module.exports={LoginController,RegisterController,
    AuthController,applyDoctorController,getAllNotificationController,
    deleteAllNotificationController,GetAllDoctors,bookAppointmentcontroller,bookingAvailabilityController,userAppointmentController}