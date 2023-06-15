const jwt = require("jsonwebtoken")
const AuthMiddleWare = async (req, res, next) => {
    var token = req.headers.authorization;
    if (token) {
        try {
            var decoded = jwt.verify(token.split(" ")[1], 'BlogApp')
            if (decoded) {
                req.body.username = decoded.username
                req.body.userId = decoded.userId
                req.body.avatar = decoded.avatar
                next();
            } else {
                res.status(200).send({ msg: "Please Login first!!" })
            }

        } catch (error) {
            console.log(error);
            res.status(400).send({ err: error.message })
        }
    } else {
        res.status(200).send({ msg: "Please Login first!!" })
    }



}

module.exports = { AuthMiddleWare }