const express = require('express');
const router = express.Router();

const { listTanques } = require('../controllers/tanqueController');

// routes based on /tanques

router.get('/:id', listTanques);




module.exports = router;