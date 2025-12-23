
import jwt from "jsonwebtoken"




export const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})
     res.cookie("jwt",token,{
        maxAge: 7 * 24 *60 * 60*1000,
        httpOnly:true,
<<<<<<< HEAD
        sameSite:"strict",
       //sameSite:"None",
=======
        
<<<<<<< HEAD
        // sameSite:"strict",
        sameSite:"none",
>>>>>>> 3161e7d (second one)
        // secure:process.env.NODE_ENV !== " development"
=======
         sameSite:"strict",
       // sameSite:"none",
        //secure:process.env.NODE_ENV !== " development"
>>>>>>> ec05524 (Updated Chatlynk features and UI improvements)
        secure:true
    }).json({message:'login successs from jwt',token})
    return token


}
