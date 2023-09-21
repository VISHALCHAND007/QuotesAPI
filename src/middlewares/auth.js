const jwt = require("jsonwebtoken");
const SCERET_KEY = process.env.SCERET_KEY;

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if(token) {
            token = token.split(" ")[1]; //since token is send like: Bearer token
            let user = jwt.verify(token, SCERET_KEY);
            req.userId = user.id;
        } else {
            return res.status(401).json({message: "Unauthorized user."});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized user."});
    }
};
module.exports = auth;