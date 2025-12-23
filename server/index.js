import express from 'express'
import dotenv from 'dotenv'
import { verifyToken } from './src/middlewares/jwt.middle.js'
import {connectDB} from './src/lib/db.js'
////import {signUp,logIn,logOut,contact,mess,validate,fetchMessage,addContact} from './src/controllers/auth.controller.js'
const{ ioConnection,signUp,logIn,logOut,contact,mess,validate,fetchMessage,addContact} = require('./src/controllers/auth.controller.js')

import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';
import User from './src/models/db.model.js'
import crypto from 'crypto'


dotenv.config()
const app = express()

//  Only ONE CORS config — with proper settings
app.use(cors({
  origin: process.env.FRONTEND_URL, // React frontend',
  methods: ['POST', 'GET'],
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, //  React frontend
    methods: ['GET', 'POST'],
    credentials: true
  }
});

connectDB()

io.on('connection', ioConnection)

app.post('/signin', signUp)
app.post('/login', logIn)
app.post('/logout', logOut)

app.patch('/post/:id', verifyToken, (req, res) => {

  const id = req.params.id
  if (id) {
    console.log(id)
    return res.json({ message: id })
  } else {
    console.log('token error')
  }
})

app.post('/contacts', contact)
app.post('/mess', mess)


//app.get('/validate', validate)
app.get('/validate', verifyToken, validate)
app.get('/validate/:id', verifyToken,validate)


server.listen(PORT, (err) => {
  if (err) console.log("Server error:", err)
  console.log("Server running on", PORT)
})


app.post('/fetch-messages',fetchMessage)


app.post('/add-contact', addContact)




// Your /upload route
const storage = multer.memoryStorage();
const upload = multer({ storage });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.post('/upload',upload.single('image'), async (req, res) => {
  try {
     const { phone } = req.body;
  
   
    if (!req.file || !phone) return res.status(400).json({ error: 'Missing image or phone' });

    // Generate unique filename with original extension
    const extension = path.extname(req.file.originalname);
    const filename = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${extension}`;



    // Update in MongoDB
    const user = await User.findOneAndUpdate(
      { phone: phone },
      { $set: {  profilePicture: {
          data: req.file.buffer,
          contentType: req.file.mimetype
        }} },
      { new: true }
    );
    await User.updateMany(
  { "contacts.phone": phone }, // find all users who have this phone in their contacts
  {
    $set: {
      "contacts.$.profilePicture":{
          data: req.file.buffer,
          contentType: req.file.mimetype
        }// whatever value you want
    }
  }
);


    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: "Profile picture updated successfully", filename });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});










