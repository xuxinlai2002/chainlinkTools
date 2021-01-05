const oracle = artifacts.require("Oracle.sol");

module.exports = function(deployer) {

  deployer.deploy(oracle,"0x41eA6aD88bbf4E22686386783e7817bB7E82c1ed");

};
