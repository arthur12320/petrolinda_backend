const express = require('express');
const router = express.Router();

const { getAllEnderecos,getAllAbastecimentos,getAllTanques } = require('../controllers/utilsController');

// routes based on /utils

router.get('/listEnderecos', getAllEnderecos);
router.get('/listAbastecimentos', getAllAbastecimentos )
router.get('/listTanques', getAllTanques )




module.exports = router;