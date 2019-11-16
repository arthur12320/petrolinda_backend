const express = require('express');
const router = express.Router();

const { getAllPostos, addPosto } = require('../controllers/stationController');

// routes based on /stations

router.get('', getAllPostos);
router.post('', addPosto);



module.exports = router;