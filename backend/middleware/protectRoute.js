import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("Token from cookies:", token ? "Present" : "Missing");   
  
         
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Unauthorized-no token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded successfully for user:", decoded.userId);
    
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized-invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    console.log("User found:", user ? user.username : "No user found");
    
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