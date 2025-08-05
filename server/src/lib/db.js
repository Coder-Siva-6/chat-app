import mongoose from "mongoose";

export  async function connectDB(){
  await  mongoose.connect(process.env.DB_URI)
  .then(()=>{
    console.log("Data base connected successfully")
  }).catch((err)=>{
    console.log("data base connection error in db.js",err.message)
  })
}
