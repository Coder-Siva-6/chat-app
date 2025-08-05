


import express from 'express'
import dotenv from 'dotenv'
import { verifyToken } from './middlewares/jwt.middle.js'
import {connectDB} from './lib/db.js'
import {signUp,logIn,logOut,contact,mess,validate,ioConnection,fetchMessage,addContact} from './controllers/auth.controller.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import mongoose from 'mongoose'

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
app.get('/validate', verifyToken, validate)

server.listen(PORT, (err) => {
  if (err) console.log("Server error:", err)
  console.log("Server running on", PORT)
})


app.post('/fetch-messages',fetchMessage)


app.post('/add-contact', addContact)














