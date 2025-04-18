import express from 'express';
import dns from 'dns'
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import { app, server } from './socket/socket.js';

//const app = express();
app.use(cookieParser());


import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import usersRoutes from './routes/users.routes.js';
import { connectToMongoDB } from './db/connectToMongoDB.js';
dotenv.config(); //

app.use(express.json());   

            
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);


server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});