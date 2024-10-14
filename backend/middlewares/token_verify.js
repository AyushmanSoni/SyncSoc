const jwt = require("jsonwebtoken");
const Secret = process.env.SECRET; 

const check_login = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, Secret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token expired or invalid. Please sign in again." });
        }
        req.user = user; 
        next();
    });
};

module.exports = { check_login };
