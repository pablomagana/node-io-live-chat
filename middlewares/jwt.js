jwt = require('jsonwebtoken');
const validateJWT = (req, res, next) => {
    console.log("IP", req.connection.remoteAddress)
    const token = req.header('x-token');
    if (!token) {
        res.status(401).json({
            ok: false,
            msg: "required token"
        })
    }
    try {
        const user = jwt.verify(token, process.env.JWT_KEY);
        console.log("autenticado con ", user.uid);
        req.uid = user.uid;
        next();
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "internal error"
        })
    }
}
module.exports = validateJWT;