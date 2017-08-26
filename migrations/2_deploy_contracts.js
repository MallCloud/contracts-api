var DINRegistry = artifacts.require("./DINRegistry.sol");

module.exports = function(deployer) {
    deployer.deploy(DINRegistry, 10000000);
};
