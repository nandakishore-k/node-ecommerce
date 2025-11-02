
const verifyRole = (roles)=> {
    return (req,res,next) => {
    if(!roles.includes(req.user.role)) return res.state(401).json({message:"acess denied"});
    
    next();
    }
}

module.exports = verifyRole;