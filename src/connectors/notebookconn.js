// web3 is an Ethereum client library
import Web3 from 'web3';
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

// This file is generated by the Solidity compiler to easily interact with
// the contract using the web3 library.
const nbAbi = require('../contracts/Notebook.json').abi;
const NotebookConnector = web3.eth.contract(nbAbi);

module.exports = NotebookConnector;
