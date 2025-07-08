import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("Token from cookies:", token);   
  
         
  if (!token) {
    return res.status(401).json({ message: "Unauthorized-no token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized-invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    console.log("Found user:", user ? user.username : "No user found");
    
    if (!user) {
      return res.status(401).json({ message: "Unauthorized- user not found" }); // If the user is not found
    }

    req.user = user;
    next(); //
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default protectRoute;