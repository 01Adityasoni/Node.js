import jwt from 'jsonwebtoken';

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */


export const authMiddleware = async (req, res, next) => {
    try{
        const tokenHeader = req.headers['authorization'];

        if(!tokenHeader){
            return next();
        }
        if(!tokenHeader.startsWith('Bearer ')){
            return res.status(400).json({error: "Invalid token format"});
        }

        const token = tokenHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();


    }catch(error){
        return res.status(401).json({error: "Invalid or expired token"});
    }

}




export const ensureAuthenticated = async (req, res, next) => {
    if(!req.user){
        return res.status(401).json({error: "Unauthorized"});
    }
    next();
}