const express =require("express")
const {VerifyToken} =require('../middlewears/authMiddleware')
const {getDoctorInfoController,updateProfileController,getDoctorByIdController,doctorAppointmentController,updateStatusController} =require('../controllers/doctorctrl')
const router= express.Router()

///post Single Doc Info

router.post("/getDoctorInfo", VerifyToken, getDoctorInfoController);

////post Update Profile/////
router.post('/updateprofile',VerifyToken,updateProfileController)
///Post Get Single Doctor///
router.post("/getdoctorbyid",VerifyToken,getDoctorByIdController)
//////////// Get Appointment //////
router.get('/doctor-appointments',VerifyToken,doctorAppointmentController)
///// Post Update Status 
router.post("/update-status",VerifyToken,updateStatusController)



module.exports= router