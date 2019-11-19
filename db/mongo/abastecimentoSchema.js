const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const abastecimentoSchema = new Schema({
  valorPago: Number,
  veiculoPlaca: String,
  valorLitro: {
    type: Number,
    required: true
  },
  litrosAbastecidos: {
    type: Number,
    required: true
  },
  dataAbastecimento: {
    type: Date,
    required: true
  },
  tanqueId:{
    type: Number,
    required: true
  }
});


const abastecimentoModel = mongoose.model('abastecimento',abastecimentoSchema);

module.exports = abastecimentoModel;