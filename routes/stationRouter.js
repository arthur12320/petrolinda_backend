const express = require('express');
const router = express.Router();

const { getAllPostos } = require('../controllers/stationController');

// routes based on /users

router.get('', getAllPostos);




module.exports = router;