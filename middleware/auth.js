import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const auth = async(req,res,next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send(); //invalid request
            } else {
                req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET, function(err, decodedToken){
                    if (err) { return res.status(401).send(); }
                    else {
                        //req.jwt.userId = decodedToken.id;
                        req.userId = decodedToken.id;
                        return next();
                    }
                } );
            }
        } catch (err) {
            return res.status(403).send(); //valid request with invalid token
        }
    } else {
        return res.status(401).send(); //invalid request
    }
}


export const minimumPermissionLevelRequired = (requiredPermissionLevel) => {
    return async(req, res, next) => {

        try {
            User.findById(req.userId, 'permissionLevel', function(err, userPermission){
                if (err) { return res.status(401).send(); }
                else {
                    req.permissionLevel = userPermission.permissionLevel;
                    if (req.permissionLevel >= requiredPermissionLevel) return next();
                    else return res.status(403).send();
                }
            } );
        } catch (error) {
            return res.status(403).send(); //forbidden
        }

    };
 };

 export const onlySameUserOrAdminCanDoThisAction = async (req, res, next)  => {
    try {
        if(req.userId === req.params.id) return next();
        else if (req.permissionLevel === 3) return next();
        else {
            return res.status(403).send();
        }
    } catch (error) {
        return res.status(403).send(); //forbidden
    }
 }