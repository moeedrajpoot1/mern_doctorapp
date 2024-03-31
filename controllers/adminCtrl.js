const doctorModel =require('../models/doctor.model')
const userSchema=require('../models/users.models')


const getAllUserControllers=async(req,res)=>{
    try {
        const users= await userSchema.find({})
      res.status(200).send({
        Message:"Users Data",
        data:users})

    } catch (error) {
        console.log(error)
        res.status(500).send({
            Message:"Error While fetching Message",
            error
        })
    }




}

const getAllDoctorsControllers=async(req,res)=>{
    try {
        
        const doctor= await doctorModel.find({})
      res.status(200).send({
        Message:"Users Data", 
        data:doctor})


    } catch (error) {
        console.log(error)

        res.status(500).send({Message:"Error While Fetching Data"})
    }

}

/////////////// Change account Status///
const changeAccounStatus=async(req,res)=>{
try {
    const {doctorId, status}=req.body
    const doctors= await doctorModel.findByIdAndUpdate(doctorId,{status})
    const user= await userSchema.findOne({_id:doctors.userId})
    const notification= user.notification
    notification.push({
        type:"doctor-account-request-updated",
        message:`Your Doctor Request Has Been ${status}`,
        onClickPath:"/notification",

    })
 user.isDoctor= status === "approved" ? true : false
 await user.save()
 res.status(201).send({
    success:true,
    Message:"Account Status Updated",
    data:doctors
 })



} catch (error) {
    console.log(error)
   res.status(500).send({
    success:false,
    Message:"Error In Account Status",
    error


   })

}


}


module.exports={getAllUserControllers,getAllDoctorsControllers,changeAccounStatus}