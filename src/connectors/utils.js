// web3 is an Ethereum client library
import Web3 from 'web3';
const web3 = new Web3();

var callback = function(error, result) {
    if (!error) {
        console.log(result);
    } else {
        console.log(error);
    }
};

function contractConnector(url, abiJSON) {
    try {
        web3.setProvider(new web3.providers.HttpProvider(url));
        const datasetAbi = require(abiJSON).abi;
        const DatasetConnector = web3.eth.contract(datasetAbi);
    } catch (e) {
        console.error("Could not connect to dataset contract. Error: ", ex);
    }
}

module.exports = {
    callback,
    contractConnector,
};
