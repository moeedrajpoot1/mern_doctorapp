const doctorModel =require("../models/doctor.model")
const appointmentModel =require('../models/appointment.models')
const userSchema =require('../models/users.models')

const getDoctorInfoController = async (req, res) => {
    try {
      const doctor = await doctorModel.findOne({ userId: req.body.userId });
      res.status(200).send({
        success: true,
        message: "doctor data fetch success",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Fetching Doctor Details",
      });
    }
  };
  




//////Update Doctore Profile////

const updateProfileController=async(req,res)=>{
try {
    const doctor= await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
    res.status(202).send({
        success: true,
        message:"Doctor Profile Updated",
        data:doctor,
    })

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"doctor Profile Update issue",
        error
    })
}
}


const getDoctorByIdController=async(req,res)=>{
  try {
  const doctor= await doctorModel.findOne({_id:req.body.doctorId})
  res.status(200).send({
    success:true,
    message:"Single Doctor Info Fetch",
    data:doctor,
  })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:"Error in Single Doctor"
    })
  }

}
////////// doctor   Appointment  Controller  ////////

const doctorAppointmentController=async(req,res)=>{
  try {
    const doctor = await doctorModel.findOne({userId:req.body.userId})
    const appointments= await appointmentModel.find({doctorId:doctor._id})
res.status(200).send({
  success:true,
  message:"Doctor Appointmnet Successfully",
  data:appointments
}) 

    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:"Error In Doctors Appointment"
    })
  }

}

//////////////////// Status Update Controller
const updateStatusController=async(req,res)=>{
try {
  const {appointmentsId,status}=req.body
  const appointments= await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
  const user = await userSchema.findOne({_id:appointments.userId})
  const notification=user.notification;
   notification.push({
     type:"Status-Updated",
     message:` Your Appointment Has been Updated ${status}`,
     onClickPath:"/doctor-appointments"
  })
   await user.save()

  res.status(200).send({
    success:true,
    message:"Appointment Status Updated"


  })


} catch (error) {
  console.log(error)
  res.status(500).send({
    success:true,
    message:"Error in Updating Status",
    error
  })
  
}
}



module.exports= {getDoctorInfoController,updateProfileController,getDoctorByIdController,doctorAppointmentController,updateStatusController}