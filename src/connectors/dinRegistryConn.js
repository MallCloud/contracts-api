// web3 is an Ethereum client library
import Web3 from 'web3';
const web3 = new Web3();

import Artifactor from 'truffle-artifactor';
import Temp from 'temp';
import fs from 'fs';
import contract from 'truffle-contract';
import path from 'path';

var requireNoCache = require("require-nocache")(module);
var provider = new Web3.providers.HttpProvider("http://172.21.0.6:8545");
var temp = Temp.track();

/**
 * Provides functions from the DIN Registry Contract
 */
const DINConnectorInstance = {
    // instance of contract; used for calling functions of a contract
    contractInst: null,
    // address of contract deployed on a network
    contractAddr: null,
    // address to which any transactions are pointed towards
    toAddress: null,
    // amount of transaction
    toAmount: 0,
    // object of web3
    web3: null,
    // provider of the web3 network
    web3Provider: null,
    // balance in account of the user
    balance: 0,
    // all available contracts in a list
    contracts: {},
    // account of the user
    account: null,
    // logs in details received by callback
    logger: null,

    /**
     * added to an event in order to send back the result of query
     * sent to event that triggers the respective event.
     * @param  {[string]} error  [error log for fn that triggered event]
     * @param  {[string]} result [result of the fn]
     */
    callback: function(error, result) {
        if (!error) {
            logger = result;
            console.log(result);
        } else {
            console.log(error)
        }
    },

    /**
     * used to select the server on which contracts are live
     */
    getProvider: function() {
        if(this.web3 !== null) {
            this.web3Provider = this.web3.currentProvider;
            this.web3 = new Web3(this.web3Provider);
        } else {
            this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
            this.web3 = new Web3(this.web3Provider);
        }
    },

    /**
     * take the abi file and connect contract corresponding to it
     */
    getContract: function() {
        var dinRegistryArtifact = require('../contracts/DINRegistry.json');
        this.contracts.DINRegistry = contract(dinRegistryArtifact);
        this.contracts.DINRegistry.setProvider(this.web3Provider);
    },

    /**
     * checks which network are we on
     */
    networkCheck: function() {
        this.web3.version.getNetwork((err, netId) => {
            if (err) {
                console.log(err);
                return;
            }

            switch (netId) {
                case '1':
                    console.log('This is mainnet');
                    break;
                case '2':
                    console.log('This is the deprecated Morden test network.');
                    break;
                case '3':
                    console.log('This is the ropsten test network.');
                    break;
                default:
                    console.log('This is an unknown network.');
            }
        });
    },

    /**
     * get all available accounts on a network
     * @return {[list]} [list of accounts available]
     */
    getAccounts: function() {
        this.web3.eth.getAccounts((error, accounts) => {
            if (error) {
                console.log(error);
                return;
            }
            return accounts;
        });
    },

    /**
     * connects to a deployed contract &
     * creates a DIN using the remote contract
     * @param  {[uint]} account [account of the person in transaction]
     * @return {[uint]} din     [newly minted DIN]
     */
    createNewDIN: function(account) {
        this.getProvider();
        // this.networkCheck();
        this.getContract();

        this.account = account;
        this.contractAddr = "0xbeb47f08ee882c4c2f18958bed17fa5a12cf9b70";

        return this.contracts.DINRegistry.at(this.contractAddr)
            .then(function(instance) {
                console.log('chal ja mc');
                var contractInstance = instance;

                var event = contractInstance.NewRegistration({owner: this.account});
                event.watch(this.callback);

                return contractInstance.registerDIN({from: this.account})
                    .then(function() {
                        event.stopWatching();
                        console.log(logger);
                        return logger.args.DIN.toString();
                    })
            })
            .then((result) => {
                console.log('new din is ' + result);
                return result;
            })
            .catch((err) => {
                console.log(err.message);
            })

    },
};

export default DINConnectorInstance;
