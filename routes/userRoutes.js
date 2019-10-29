const express = require('express');
const router = express.Router();

const { getAllUsers, deleteOneUser } = require('../controllers/userController');

// routes based on /users

router.get('', getAllUsers); //done
router.delete('/:login', deleteOneUser);




module.exports = router;