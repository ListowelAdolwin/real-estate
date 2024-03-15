const User = require('../models/User')
const bcrypt = require('bcrypt')

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

exports.Login = (req, res) => {
    console.log(req.body)
}