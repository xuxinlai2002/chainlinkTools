const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

const config = require('./config.json');
const url = config["url"];
const privateKey = config["privateKey"];
const params = config["params"];
const value = config["value"];
const web3 = new Web3(new Web3.providers.WebsocketProvider(url) ) ;     
//var _from = "0x41eA6aD88bbf4E22686386783e7817bB7E82c1ed";
var _from = web3.eth.accounts.privateKeyToAccount(privateKey)["address"];
var privateKeyConvert = Buffer.from(privateKey,'hex');//process.env.PRIVATE_KEY_1


async function sendEachTx(toAddress,index) {

    // 返回一个 Promise
    return new Promise(( resolve, reject ) => {

         

          web3.eth.getTransactionCount(_from,(err,txcount)=>{


            var txObject ={
              nonce: web3.utils.toHex(txcount + index),
              gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
              gasLimit: web3.utils.toHex(21000),
              to: toAddress,
              value:web3.utils.toHex(web3.utils.toWei(value,'ether')),
            }
    

          var tx = new Tx(txObject);
          tx.sign(privateKeyConvert);
          var serializedTx = tx.serialize();
          
          web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
              if (!err){
                  console.log(index + ":" + toAddress  + ":" + value +":"+ hash);
                  resolve();
              }else{
                  console.log(err);
                  reject( err )
              }
          });
 
      });


  });

}

async function sendTx() {

    for(var i = 0 ; i < params.length ;i ++){
      await sendEachTx(params[i],i);
    }
    console.log("end");

}

sendTx();  

// main().then(() => {
//   console.log("regest OK");
// }).catch((e) => {
//   console.log("error", e);
// });