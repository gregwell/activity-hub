import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const auth = async(req,res,next) => {
    console.log("2222");
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send(); //invalid request
            } else {
                req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
                return next();
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
        console.log("tt");
        let authorization = req.headers['authorization'].split(' ');
        req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET, function(err, decodedToken){
            if (err) { return res.status(401).send();}
            else {
                req.userId = decodedToken.id;
                User.findById(req.userId, 'permissionLevel', function(err, document){
                    if (err) { return res.status(401).send(); }
                    else {
                        console.log("dd");
                        if (document.permissionLevel >= requiredPermissionLevel) return next();
                        else return res.status(403).send();
                    }
                } );
            }
        });
        

        
    };
 };