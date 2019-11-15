const express = require('express');
const router = express.Router();

require('../passport');
const { abastecer, listLatests } = require('../controllers/abastecimentoController');


// routes based on /abastecimento

router.post('/', abastecer); //done
router.get('/', listLatests)

module.exports = router;