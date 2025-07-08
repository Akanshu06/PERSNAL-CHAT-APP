// socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://persnal-chat-app.vercel.app", 
      "http://localhost:3000",
      "https://persnal-chat-app.onrender.com"
    ],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

const userSocketMap = {}; // { userId: socketId }

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Extract userId from query
  const userId = socket.handshake.query.userId;

  // Safety check to avoid undefined/null/empty values
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`🟢 User ${userId} is online`);
  }

  // Send current online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Listen for user disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);

    if (userId && userSocketMap[userId]) {
      delete userSocketMap[userId];
      console.log(`🔴 User ${userId} went offline`);
    }

    // Update all clients with current online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
