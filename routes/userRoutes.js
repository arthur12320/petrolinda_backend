const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/userController');

// routes based on /users

router.get('', getAllUsers); //done




module.exports = router;