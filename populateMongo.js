console.log('code started')
const mongoose = require('mongoose');

const fs = require('fs');


const {getAllAbastecimentos} = require('./db/commands');
const Abastecimento = require('./db/mongo/abastecimentoSchema');

console.log('connecting to db..')
const mongouri='mongodb+srv://arthur12320:34323060@cluster0-smkvf.mongodb.net/bd2backendnosql?retryWrites=true&w=majority'
mongoose.connect(mongouri,{
  useCreateIndex:true,
  useNewUrlParser:true,
  useUnifiedTopology:true
});
const db = mongoose.connection;
db.on('connected',()=>{
  console.log('connecting to db');
  doStuff();
});


function doStuff(){
  console.log('requiring abastecimentos');
  getAllAbastecimentos(async (abastecimentos,err)=>{
    if(err){
      console.log('error fetching abastecimentos');
      process.kill(process.pid);
    }
    
    console.log('abastecimentos fetched')
    console.log('porting '+abastecimentos.length+' abasteciemntos')

    if(process.argv[2] == 'f' || process.argv[2] == 'fast' || process.argv[2] == '-f' || process.argv[2] == '-fast'){
      await abastecimentos.forEach(async (element,index) => {
        let abastecimentoa = {
          valorPago: element.preco_pago,
          veiculoPlaca: element.veiculo_placa,
          valorLitro: element.preco_por_litro,
          litrosAbastecidos: element.litros_abastecidos,
          dataAbastecimento: element.data_de_abastecimento,
          tanqueId: element.tanque_id
        }
        let newabastecimento = new Abastecimento(abastecimentoa);
        await newabastecimento.save();
        console.log(`${index}/${abastecimentos.length} done`);
      });
    }else{
      let index = 1;
      for (let element of abastecimentos) {
        let abastecimentoa = {
          valorPago: element.preco_pago,
          veiculoPlaca: element.veiculo_placa,
          valorLitro: element.preco_por_litro,
          litrosAbastecidos: element.litros_abastecidos,
          dataAbastecimento: element.data_de_abastecimento,
          tanqueId: element.tanque_id
        }
        let newabastecimento = new Abastecimento(abastecimentoa);
        await newabastecimento.save();
        console.log(`${index}/${abastecimentos.length} done`);
        index++;
      }
    }

    

    console.log('done porting db');
    mongoose.disconnect();
  })



}
