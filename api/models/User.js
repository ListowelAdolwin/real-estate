const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/real-estate-listo.appspot.com/o/default_avatar.jpg?alt=media&token=fde2ea0a-8822-477f-b2d9-d8493452da88"
    }
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema)