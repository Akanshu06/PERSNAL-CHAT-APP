import { log } from 'console';
import User from '../models/user.model.js';

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    console.log("Getting users for logged in user:", loggedInUser);
    
    const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select('-password');
    console.log("Found users:", filteredUsers.length);
    
    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error);
    
    return res.status(500).json({ error: error.message });
  }
};