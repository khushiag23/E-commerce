const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const isAdmin = async (req,res,next) => {
    try {
        const token = req.headers.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized"})
        }
        const user = await User.findById(decoded.id);
        if(!user.isAdmin){
            return res.status(403).json({message:"Forbidden"})
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
}
module.exports = isAdmin;