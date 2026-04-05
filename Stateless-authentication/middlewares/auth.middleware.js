const jwt = require('jsonwebtoken');
require('dotenv/config');



const authenicationMiddleware = async function (req,res,next) {
    try{
    const tokenHeader = req.headers['authorization'];
    if(!tokenHeader) {
        return next();
    }
    if(!tokenHeader.startsWith('Bearer ')) {
        return res.status(400).json({message: "Invalid token format"});
    }
    const token = tokenHeader.split(' ')[1];
    const decoaded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoaded;
    next();
}catch(err) {
    next();
}
};






const ensureAuthenticated = function (req,res,next) {
    if(!req.user) {
        return res.status(401).json({message: "Unauthorized"});
    }
    next();

    
};



const restrictToRole =  function (role) {
    return function (req,res,next) {
        if(req.user.role !== role) {
            return res.status(403).json({message: "Forbidden: insufficient permissions"});
        }
        next();
    };
};





module.exports = { authenicationMiddleware, ensureAuthenticated, restrictToRole };
