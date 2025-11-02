const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token) return res.status(400).json({message:"no token!"});

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decoded;
        console.log("verified:",req.user);
        next()
    }
    catch(error){
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

module.exports = {verifyToken}