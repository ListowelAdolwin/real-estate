const jwt = require('jsonwebtoken')
const handleErrors = require('./errors')

exports.verifyToken = (req, res, next) => {
    const header = req.headers.Authorization || req.headers.authorization
    
    if (!header?.startsWith('Bearer ')){
        return res.status(401).json({msg: 'Invalid token format'})
    }
    const token = header.split(" ")[1]
    console.log(token)
    if (!token) {
        return res.status(403).json({msg: "User not authenticated!"})
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).json({msg: "Verification token not valid"})
        }
        req.user = user
        next()
    })
}