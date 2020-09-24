const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

//Saves a user and password
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

//Specific user
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

//Delete a user
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.userId });
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

//Update a username and password
router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId }, 
            { $set: { username: req.body.username } }
        );

        const updatedPassword = await User.updateOne(
            { _id: req.params.userId }, 
            { $set: { password: req.body.password } }
        );

            res.json(updatedPassword);
            res.json(updatedUser);
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;