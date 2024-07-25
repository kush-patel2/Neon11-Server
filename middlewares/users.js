const jwt = require("jsonwebtoken");
const userModel = require("../models/Users/Users");

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    
    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

module.exports = authenticate;
