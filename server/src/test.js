import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173" // ✅ no trailing slash
  }
});

// Map userId → socket.id
const userSocketMap = {};

io.on('connection', (socket) => {
  console.log("✅ User connected:", socket.id);


  socket.on('phone',(phone)=>{
    userSocketMap[phone]=socket.id
    console.log(`🧠 Mapped ${phone} → ${socket.id}`)
  })

  // Send message to specific user
  socket.on('send_message', async ( data ) => {
    const{toNumber,toMessage}= data
    const toSocketID = userSocketMap[toNumber];
console.log(toNumber)
    if (toSocketID) {
      socket.to(toSocketID).emit('receive_message',{
        from: 'me',
        toMessage, // keep consistent with frontend
      });
      console.log("📤 Message sent to",toNumber);
    } else {
      console.log('❌ Target user offline:', toNumber);
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    for (let userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
