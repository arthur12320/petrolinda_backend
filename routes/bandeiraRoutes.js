const express = require('express');
const router = express.Router();

const { getAllBandeiras } = require('../controllers/bandeiraController');

// routes based on /bandeiras

router.get('', getAllBandeiras);




module.exports = router;