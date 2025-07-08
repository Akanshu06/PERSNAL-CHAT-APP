import jwt from "jsonwebtoken";


const generateTokenAndSetCookie = (userId,res) => {
   // console.log(process.env.JWT_SECRET);
    
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    res.cookie("jwt", token, {
         // client side js cannot access the cookie XSS
         maxAge: 30 * 24 * 60 * 60 * 1000,
         httpOnly: true,
         sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production" ? true : false,
    });
}

export default generateTokenAndSetCookie;
