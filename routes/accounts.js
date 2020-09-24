const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

//Get all accounts
router.get('/', async (req, res) => {
    try {
        const accounts = await Account.find();
        res.json(accounts);
    } catch (err) {
        res.json({ message: err });
    }
});

//Saves an account
router.post('/', async (req, res) => {
    const accounts = new Account({
        number: req.body.number,
        name: req.body.name,
        balance: req.body.balance
    });

    try {
        const savedAccount = await accounts.save();
        res.json(savedAccount);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;