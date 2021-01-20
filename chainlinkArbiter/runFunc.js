const RunJSON = require('./contracts/Arbiter.json');
const Web3 = require('web3');

const config = require('./config.json');
const url = config["url"];
const web3Obj = new Web3(url);

const ContractAddress = config["contractAddress"];
const privateKey = config["privateKey"];

const Run = new web3Obj.eth.Contract(RunJSON.abi, ContractAddress, {
  gasPrice: 1000000000, // 1gwei
  gasLimit: 4013440000,
});


async function main() {


  const params = config["params"];
  const account = web3Obj.eth.accounts.privateKeyToAccount(privateKey);
  for(var i = 0 ;i < params.length ;i ++){

    var transaction;
    param = params[i];

    transaction = Run.methods.registerArbiter(
      param['pub'],
      param['orcale'],
      param['jobID'],
      param['sig'],

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