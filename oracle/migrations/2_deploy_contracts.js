const oracle = artifacts.require("Oracle.sol");

module.exports = function(deployer) {

  deployer.deploy(oracle,"0x62e7a4ab7bd21dd1440b0622f6ce34f7465d5be8");

};
