const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    number: String,
    name: String,
    balance: String
})

module.exports = mongoose.model('Accounts', AccountSchema);