const RunJSON = require('./contracts/Oracle.json');
const Web3 = require('web3');

const config = require('./config.json');
const url = config["url"];
const web3Obj = new Web3(url);

const privateKey = config["privateKey"];

async function main() {


  const params = config["params"];
  const account = web3Obj.eth.accounts.privateKeyToAccount(privateKey);

  for(var i = 0 ;i < params.length ;i ++){

    var transaction;
    param = params[i];

    // console.log(RunJSON.abi);
    console.log(param["orcale"]);
    const Run = new web3Obj.eth.Contract(RunJSON.abi, param["orcale"], {
      gasPrice: 1000000000, // 1gwei
      gasLimit: 40134400000,
    });

    transaction = Run.methods.setFulfillmentPermission(
      param['account'],
      true
    );

    const options = {
        to      : transaction._parent._address,
        data    : transaction.encodeABI(),
        gas     : await transaction.estimateGas({from: account.address}),
        gasPrice: await web3Obj.eth.getGasPrice() // or use some predefined value
    };

    const signed  = await web3Obj.eth.accounts.signTransaction(options, privateKey);
    const receipt = await web3Obj.eth.sendSignedTransaction(signed.rawTransaction);

    console.log("no " + i + " tx: " + receipt["transactionHash"]);

  }

};

  
main().then(() => {
  console.log("regest OK");
}).catch((e) => {
  console.log("error", e);
});