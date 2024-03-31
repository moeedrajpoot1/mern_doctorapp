const jwt=require("jsonwebtoken")

const VerifyToken=async(req,res,next)=>{

const token= req.headers.authorization.split(' ')[1]
try {
    if(!token){
        return res.status(200).send({Message:"Token Is Required"})
    }
const decode= jwt.verify(token,process.env.JWT_SECRET)
req.body.userId=decode.id
next()

} catch (error) {
    console.log(error)
}



}
module.exports= {VerifyToken}