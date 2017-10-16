// web3 is an Ethereum client library
import Web3 from 'web3';
const web3 = new Web3();

import Artifactor from 'truffle-artifactor';
import Temp from 'temp';
import fs from 'fs';
import contract from 'truffle-contract';
import path from 'path';

var requireNoCache = require("require-nocache")(module);
var url = 'http://172.21.0.5:8545';
var provider = new Web3.providers.HttpProvider(url);
var temp = Temp.track();

/**
 * Provides functions from the DIN Registry Contract
 */
const MarketConnectorInstance = {
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
            this.logger = result;
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
            this.web3Provider = new Web3.providers.HttpProvider(url);
            this.web3 = new Web3(this.web3Provider);
        }
    },

    /**
     * take the abi file and connect contract corresponding to it
     */
    getContract: function() {
        var DINRegistryArtifact = require('../contracts/DINRegistry.json');
        this.contracts.DINRegistry = contract(DINRegistryArtifact);
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
    createMarket: function(account) {
        const self = this;

        this.getProvider();
        this.networkCheck();
        this.getContract();

        self.account = account;
        self.contractAddr = "";


    },
};

export default MarketConnectorInstance;
