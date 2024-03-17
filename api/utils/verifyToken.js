const jwt = require('jsonwebtoken')
const handleErrors = require('./errors')

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken

    if (!token) {
        return next(handleErrors(401), "Unauthorized!")
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return next(handleErrors(403, "Forbidden"))
        }
        req.user = user
        next()
    })
}