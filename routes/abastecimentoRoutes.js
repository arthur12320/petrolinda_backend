const express = require('express');
const router = express.Router();

require('../passport');
const { abastecer } = require('../controllers/abastecimentoController');


// routes based on /abastecimento

router.post('/', abastecer); //done


module.exports = router;