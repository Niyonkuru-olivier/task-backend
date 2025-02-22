const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('User routes are working');
});

// Create a new user (without confirmPassword)
router.post('/CreateAccount', async (req, res) => {
    const { email, password } = req.body;

    // Check if the passwords match (if you need to compare passwords on frontend, omit this part)
    if (password !== req.body.password) {
        return res.status(400).send({ error: 'Passwords do not match' });
    }

    try {
        const user = new User({ email, password });
        await user.save();
        res.status(201).send({ user, message: "User created successfully" });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Login route
router.post('/Login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_KEY);

        res.send({ user, token, message: 'Login successful' });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

module.exports = router;