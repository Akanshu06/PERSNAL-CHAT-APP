import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { app, server } from './socket/socket.js';

dotenv.config();

app.use(cookieParser());
app.use(express.json());

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import usersRoutes from './routes/users.routes.js';
import { connectToMongoDB } from './db/connectToMongoDB.js';

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});