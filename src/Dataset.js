/*
 *  Dataset API.
 */

import Web3 from 'web3';
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

const DatasetAbi;
const DatasetConnector;

var DatasetContractInstance;


/**
 * Connect to the Dataset contract.
 *
 * @return true if connection succeded and false if not.
 */
export function ConnectToDatasetContract() {
    try {
        DatasetAbi = require('../build/contracts/Dataset.json').abi;
        DatasetConnector = web3.eth.contract(DatasetAbi);
        module.exports = DatasetConnector;
        return true;
    }
    catch (ex) {
        console.error("Could not connect to dataset contract. Error: ", ex);
        return false;
    }
}

/**
 * Create a Dataset contract.
 *
 * @param sellerAddress Address as 32 bytes hexadecimal string starting 0x
 *
 * @param uniqueKey Unique key as 32 bytes hexadecimal string starting 0x
 *
 * @param name Dataset name as string
 *
 * @param price Dataset price as integer
 *
 * @param usageFee Dataset usage fee as integer
 *
 * @return true if creation succeded and false if not.
 */
export function CreateDataset(sellerAddress, uniqueKey, name, price, usageFee) {
    try {
        var DatasetContract = web3.eth.contract(DatasetAbi);
        DatasetContractInstance = new DatasetContract(sellerAddress, uniqueKey, name, price, usageFee);
        return true;
    }
    catch (ex) {
        console.error("Could not create dataset contract. Error: ", ex);
        return false;
    }
}

/**
 * Retrives the Dataset contract location.
 *
 * @return true if process succeded and false if not.
 * Logs on screen the information about the contract creation, including its address.
 */
export function RetrieveDataMarketplaceLocation() {
    try {
        var receipt = web3.eth.getTransactionReceipt(DatasetContractInstance);
        console.log(receipt);
        return true;
    }
    catch (ex) {
        console.error("Could not retrieve dataset contract location. Error: ", ex);
        return false;
    }
}




