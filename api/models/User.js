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
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AUser-avatar.svg&psig=AOvVaw2fmx2iGhgl7QbdpUmUqFTk&ust=1710703716482000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMjZtozC-YQDFQAAAAAdAAAAABAE"
    }
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema)