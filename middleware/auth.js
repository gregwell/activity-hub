import jwt from 'jsonwebtoken';

export const auth = async(req,res,next) => {

    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
                return next();
            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }



    /*
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;

        if(token) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedData?.id;
            next();
        } else{
            res.status(403).send();
        }


    } catch (error) {
        console.log(error);
    }
    */

}
