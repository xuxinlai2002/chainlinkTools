const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {

  networks: {

    development: {
     provider: () => new HDWalletProvider(mnemonic, `http://127.0.0.1:8545`), 
     network_id: 22, 
    }
  },

  compilers: {
    solc: {
      version: "0.4.24", 
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }


}
