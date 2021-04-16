const mongoose = require("mongoose")

const registerSchema = mongoose.Schema({
    username: String,
    password: String
})

module.exports = mongoose.model("Register", registerSchema)