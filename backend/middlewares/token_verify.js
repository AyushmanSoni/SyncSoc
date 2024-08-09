const jwt = require("jsonwebtoken");
const Secret = "Do you want to know my secret?"

const check_login = (req,res,next) => {
    // console.log(req.headers)

    if(!req.headers || !req.headers["authorization"]){
        return res.status(401).json({message: "Authentication token required"});
    }

    const token = req.headers["authorization"].split(" ")[1] 

    // const authHeader= req.headers["authorization"];
    // console.log(authHeader.token)
    // const token = authHeader && authHeader.token;

    // console.log(token)

    if(token == null){
        return res.status(401).json({message: "Authentication token required"});
    }

    jwt.verify(token,Secret, (err,user) => {
        if(err){
            return res.status(403).json({message: "Token expired please sign in again"});
        }
        req.user = user;

        // console.log(req.user)
        next();
    });
};

module.exports = {check_login};