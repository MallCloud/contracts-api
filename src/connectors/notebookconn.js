// web3 is an Ethereum client library
import Web3 from 'web3';
const web3 = new Web3();

/*
 *  Notebook API.
 */
var NotebookConnectionInstance = {
    /**
     * Connect to the Notebook contract.
     */
    ConnectToNotebookContract: function (url='http://localhost:8545') {
        try {
            // web3.setProvider(new web3.providers.HttpProvider(url));

            // This file is generated by the Solidity compiler to easily interact with
            // the contract using the web3 library.

            // const notebookAbi = require('../contracts/Notebook.json').abi;
            // const NotebookConnector = web3.eth.contract(notebookAbi);
        }

        catch (e) {
            console.error("Could not connect to notebook contract. Error: ", ex);
        }

        finally {
            // cleanup
        }
    },
};

export default NotebookConnectionInstance;
