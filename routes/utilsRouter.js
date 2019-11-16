const express = require('express');
const router = express.Router();

const { getAllEnderecos } = require('../controllers/utilsController');

// routes based on /utils

router.get('/listEnderecos', getAllEnderecos);




module.exports = router;