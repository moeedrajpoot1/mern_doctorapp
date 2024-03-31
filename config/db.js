const mongoose =require("mongoose")
const colors=require("colors")

const DataBaseConnection=async()=>{
try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`DataBase Connected`.bgBlue)
} catch (error) {
    console.log(`Server Faild ${error}`.bgRed)
}

}
module.exports=DataBaseConnection