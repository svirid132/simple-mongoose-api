const mongoose = require('mongoose')

const additionalSchema = mongoose.Schema({
    keyWord: String
})

const Additional = mongoose.model('Additional', additionalSchema)
module.exports = Additional