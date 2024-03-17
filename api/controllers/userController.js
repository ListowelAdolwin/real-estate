const handleErrors = require("../utils/errors")
const User = require("../models/User")
const bcrypt = require('bcrypt')


exports.updateUser = async (req, res, next) => {
    const user = req.user
    const userId = req.params.id
    if (user.id != userId) {
        return next(handleErrors(401, "You can only update your profile"))
    }
    if (req.body.password){
        req.body.password = bcrypt.hashSync(req.body.password, 10)
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, {new: true})
        const {password:pass, ...rest} = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

exports.getAdolwin = (req, res) => {
    res.json({"msg": "Hello, Adolwin"})
}