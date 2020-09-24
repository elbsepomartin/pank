const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Login = require('../models/Login');

//Login
router.get('/', (req, res) => {
    res.send('We are on login');
});

//Post login
router.post('/', [
    // username must be a string
    body('username').isString(),
    // password must be a string
    body('password').isString()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (req.body.username == '' && req.body.password == '' 
        || req.body.username == '' 
        || req.body.password == '') {
            return res.status(400).json({ errors: [{ msg: "Missing username or password" }] });
        }
        // validate a user with given username and password excists in the database
        const user = await User.find({ username: req.body.username, password: req.body.password }).exec();
        if (user == '') {
            return res.status(401).json({ errors: [{ msg: "Invalid username or password" }] });
        }
        const login = new Login({ userId: user._id }).save();
        return res.status(200).json({ msg: "Logged in! Login session token successfully created" });
    })

//Delete a Id
router.delete('/:userId', async (req, res) => {
    try {
        const removedLogin = await Login.deleteOne({ _id: req.params.userId });
        res.status(200).json({ message: "Token successfully deleted" });
    } catch (err) {
        res.status(401).json({ message: "Unsuccessful" });
    }
});

module.exports = router;