import { log } from 'console';
import User from '../models/user.model.js';

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select('-password');
    //console.log(filteredUsers);
    
    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ error: error.message });
  }
};