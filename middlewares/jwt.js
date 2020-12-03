jwt = require('jsonwebtoken');
const validateJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        res.status(401).json({
            ok: false,
            msg: "required token"
        })
    }
    try {
        const uid = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "internal error"
        })
    }
}
module.exports = validateJWT;