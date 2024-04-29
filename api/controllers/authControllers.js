const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const handleErrors = require('../utils/errors')
const generator = require('generate-password')

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
    const expirationDate = new Date();
    expirationDate.setDate(new Date().getDate() + 1);
    res.cookie('accessToken', token, {httpOnly: true}).status(200).json({user: rest, accessToken: token})
    } catch (error) {
        next(error)
    }
}

exports.logOut = (req, res, next) => {
    try {
        res.clearCookie("accessToken").json({ msg: "User successfully logged out!" });
    } catch (error) {
        console.error("Error clearing cookie:", error);
        res.status(500).json({ error: "Failed to log out user" });
    }
};


exports.googleAuth = async (req, res, next) => {
    const {name, email, avatar} = req.body
    try {
        const foundUser = await User.findOne({email})
        if (foundUser){
            const token = jwt.sign({id: foundUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
            const {password:pass, ...rest} = foundUser._doc
            res.cookie('accessToken', token, {httpOnly: true, secure: true}).status(200).json({user: rest, accessToken: token})
        }else{
            const unhashedPassword = generator.generate({
                length: 16,
                numbers: true,
                symbols: true
            })
            const password = bcrypt.hashSync(unhashedPassword, 10)
            const username = name.split(" ").join("").toLowerCase() + '-' + Math.random().toString().slice(-8)
            const newUser = await User({username, email, password, avatar})
            await newUser.save()
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
            const {password:pass, ...rest} = newUser._doc
            res.cookie('accessToken', token, {httpOnly: true}).status(200).json({user: rest, accessToken: token})
        }
    } catch (error) {
        next(error)
    }
}   