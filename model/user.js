const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    idAdditional: mongoose.ObjectId
})

const User = mongoose.model('User', userSchema)
module.exports = User