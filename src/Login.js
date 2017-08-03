/*
 *  Login API.
 */

import Web3 from 'web3';
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

const LoginAbi;
const LoginConnector;

var LoginContractInstance;

/**
 * Connect to the Login contract.
 *
 * @return true if connection succeded and false if not.
 */
export function ConnectToLoginContract() {
    try {
        LoginAbi = require('../build/contracts/Login.json').abi;
        LoginConnector = web3.eth.contract(LoginAbi);
        module.exports = LoginConnector;
        return true;
    }
    catch (ex) {
        console.error("Could not connect to login contract. Error: ", ex);
        return false;
    }
}

/**
 * Create a Login contract.
 *
 * @param challenge Challenge as string
 *
 * @return true if creation succeded and false if not.
 */
export function CreateloginContract(challenge) {
    try {
        var LoginContract = web3.eth.contract(LoginAbi);
        LoginContractInstance = new LoginContract(challenge);
        return true;
    }
    catch (ex) {
        console.error("Could not create login contract. Error: ", ex);
        return false;
    }
}









