const express =require("express")
const { VerifyToken } = require("../middlewears/authMiddleware")
const { getAllUserControllers, getAllDoctorsControllers, changeAccounStatus } = require("../controllers/adminCtrl")
const adminrouter=express.Router()


///// Get MEthod /// Users
adminrouter.get('/getAllusers',VerifyToken,getAllUserControllers)

/////////Get All Doctors
adminrouter.get('/getAlldoctors',VerifyToken,getAllDoctorsControllers)


////////// Account Status ////
adminrouter.post('/changeAccountStatus',VerifyToken,changeAccounStatus)


module.exports = adminrouter