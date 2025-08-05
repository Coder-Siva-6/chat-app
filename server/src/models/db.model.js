import mongoose from "mongoose";

//  Message Sub-schema with timestamps
const messageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    text: {
      type: String
    }
  },
  { timestamps: true }
);




//  Contact Sub-schema with messages array + timestamps
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: ""
    },
    phone: {
      type: Number,
      required: true
    },
    message: [messageSchema]
  },
  { timestamps: true }
);




// ✅ Main User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String
    },
    email: {
      required: true,
      type: String,
      unique: true
    },
    phone: {
      required: true,
      type: Number,
      unique: true
    },
    password: {
      required: true,
      type: String
    },
    contacts: [contactSchema]
  },
  { timestamps: true }
);




// const userSchema = new mongoose.Schema({
//     name:{
//         required:true,
//         type:String,
//     },
//      email:{
//         required:true,
//         type:String,
//         unique:true
//     },
//      phone:{
//         required:true,
//         type:Number,
//         unique:true,
//         length:10
//     },
//      password:{
//         required:true,
//         type:String   
//     },
//     contacts:[
//         {
//             name:{
//                 type:String,
//                 default:""

//             },
//             phone:{
//                 type:Number,
//                 required:true,

//             },
//             message:[
//                 {
//                     type:{
//                         type:String,
//                         required:true
//                        },
//                     text:{
//                         type:String,
                    
//                     }

                    
                    
//                 },
//                 {timestamps:true}

//             ]
//         }
//         ,{timestamps:true}
//     ]
// },{timestamps:true} )

const User = mongoose.model('user',userSchema)
export default User