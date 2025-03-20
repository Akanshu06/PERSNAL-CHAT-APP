import mongoose from "mongoose";

const messageScema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,           // This is the user who sent the message
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,           // This is the user who received the message
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageScema); 

export default Message;

