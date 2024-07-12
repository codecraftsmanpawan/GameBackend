const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const MasterUser = require('../models/MasterUser');
const Client = require('../models/Client'); // Assuming you have a Client model defined

const addMasterUser = async (req, res) => {
    const { code, percentage, brokarge, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newMasterUser = new MasterUser({
            code,
            percentage,
            brokarge, // corrected the field name
            username,
            password: hashedPassword,
        });

        await newMasterUser.save();
        res.status(201).send({ message: 'MasterUser created' });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

const getAllMasterUsers = async (req, res) => {
    try {
        const masterUsers = await MasterUser.find();
        res.json(masterUsers);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

const getMasterUserById = async (req, res) => {
    try {
        const masterUser = await MasterUser.findById(req.params.id);
        if (!masterUser) {
            return res.status(404).send({ message: 'MasterUser not found' });
        }
        res.json(masterUser);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

const updateMasterUser = async (req, res) => {
    try {
        const masterUser = await MasterUser.findById(req.params.id);
        if (!masterUser) {
            return res.status(404).send({ message: 'MasterUser not found' });
        }

        const { code, percentage, brokarge, username, password } = req.body;
        masterUser.code = code || masterUser.code;
        masterUser.percentage = percentage || masterUser.percentage;
        masterUser.brokarge = brokarge || masterUser.brokarge; // corrected the field name
        masterUser.username = username || masterUser.username;
        if (password) {
            masterUser.password = await bcrypt.hash(password, 10);
        }
        masterUser.updateDate = Date.now();

        await masterUser.save();
        res.json({ message: 'MasterUser updated' });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

const deleteMasterUser = async (req, res) => {
    try {
        const masterUser = await MasterUser.findById(req.params.id);
        if (!masterUser) {
            return res.status(404).send({ message: 'MasterUser not found' });
        }
        await masterUser.remove();
        res.json({ message: 'MasterUser deleted' });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

const loginMasterUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const masterUser = await MasterUser.findOne({ username });
        if (!masterUser) {
            return res.status(404).send({ message: 'MasterUser not found' });
        }

        const isMatch = await bcrypt.compare(password, masterUser.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: masterUser._id, username: masterUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

// Get profile of MasterUser by username
const getMasterUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const masterUser = await MasterUser.findOne({ username });
        if (!masterUser) {
            return res.status(404).send({ message: 'MasterUser not found' });
        }
        res.json(masterUser);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
};

// New function to get clients by masterCode
const getClientsByMasterCode = async (req, res) => {
    try {
        const { code } = req.params;
        const clients = await Client.find({ masterCode: code });
        res.json(clients);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving clients', error: error.message });
    }
};

module.exports = {
    addMasterUser,
    getAllMasterUsers,
    getMasterUserById,
    updateMasterUser,
    deleteMasterUser,
    loginMasterUser,
    getMasterUserProfile, // Export the new function
    getClientsByMasterCode
};
