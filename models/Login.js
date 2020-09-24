const mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    userId: String,
    token: String
})

module.exports = mongoose.model('Login', LoginSchema);