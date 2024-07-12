const express = require('express');
const {
    addMasterUser,
    getAllMasterUsers,
    getMasterUserById,
    updateMasterUser,
    deleteMasterUser,
    loginMasterUser,
    getMasterUserProfile, // Import the new function for getting profile
    getClientsByMasterCode
} = require('../controllers/masterUserController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, addMasterUser);
router.get('/', authMiddleware, getAllMasterUsers);
router.get('/:id', authMiddleware, getMasterUserById);
router.put('/:id', authMiddleware, updateMasterUser);
router.delete('/:id', authMiddleware, deleteMasterUser);
router.post('/login', loginMasterUser);
router.get('/profile/:username', authMiddleware, getMasterUserProfile); // Route for getting profile
router.get('/clients/:code', authMiddleware, getClientsByMasterCode);

module.exports = router;
