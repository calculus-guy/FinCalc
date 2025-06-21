const jwt = require('jsonwebtoken')
const User = require("../models/User")

exports.protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    // console.log("Token:", token)
    if (!token) return res.status(401).json({message: "Not authorized, no token"})

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // console.log("decodedd", decoded)
            req.user = await (User.findById(decoded.id).select('-password'))
            // console.log("user from db", req.user)
            next()
        }
        catch (err){
            res.status(401).json({message: err.message || "Token verification failed"})
        }
}