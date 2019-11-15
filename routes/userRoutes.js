const express = require('express');
const router = express.Router();
const passport = require('passport')

const { getAllUsers, deleteOneUser } = require('../controllers/userController');
const passportJWT = passport.authenticate('jwt', { session: false });

// routes based on /users

router.get('', getAllUsers); //done
router.delete('/:login', passportJWT, deleteOneUser);




module.exports = router;