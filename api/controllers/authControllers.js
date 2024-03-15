const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const handleErrors = require('../utils/errors')

exports.Register = async (req, res, next) => {
    const {username, email, password} = req.body
    const hashedP = bcrypt.hashSync(password, 10)
    const newUser = User({username:username, email:email, password:hashedP})
    try {
        await newUser.save()
        res.json({success: true, msg: "New user registered successfully"})
    } catch (error) {
        console.log(error)
        next(error)
    }
}


exports.Login = async (req, res, next) => {
    const {email, password} = req.body

    try {
        const validUser = await User.findOne({email})
    if (!validUser){
        return next(handleErrors(404, "No user associated with this email"))
    }

    const validPassword = await bcrypt.compare(password, validUser.password)
    if (!validPassword){
        return next(handleErrors(401, "Invalid credentials"))
    }
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
    const {password:pass, ...rest} = validUser._doc
    res.cookie('accessToken', token, {httpOnly: true}).status(200).json(rest)
    } catch (error) {
        next(error)
    }
    
}