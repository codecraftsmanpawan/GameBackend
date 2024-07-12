const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
};

module.exports = { adminLogin };
