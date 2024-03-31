const express=require("express")
const { LoginController, RegisterController, AuthController,applyDoctorController,getAllNotificationController,deleteAllNotificationController,GetAllDoctors,bookAppointmentcontroller,bookingAvailabilityController,userAppointmentController } = require("../controllers/userCtrl")
const { VerifyToken } = require("../middlewears/authMiddleware")

const router=express.Router()


//login
router.post('/login',LoginController)
//register
router.post("/register",RegisterController)
//auth//home/post
router.post('/getUser',VerifyToken,AuthController)

///Apply-to-Doctor////
router.post('/apply-doctor',VerifyToken,applyDoctorController)

/// Notification Doctor////
router.post('/get-all-notification',VerifyToken,getAllNotificationController)
////////delete All Notification ///
router.post('/delete-all-notification',VerifyToken,deleteAllNotificationController)

//// Get All Doc 
router.get("/getAllDoctors",VerifyToken,GetAllDoctors)

//////Book Appointment ////
router.post("/book-appointment",VerifyToken,bookAppointmentcontroller)

///Bookin availability
router.post("/booking-availability",VerifyToken,bookingAvailabilityController)

/////// Appountment Lists 
router.get("/users-appointments",VerifyToken,userAppointmentController)


module.exports=router