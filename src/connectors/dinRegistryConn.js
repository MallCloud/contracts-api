// web3 is an Ethereum client library
import Web3 from 'web3';
const web3 = new Web3();

import Artifactor from 'truffle-artifactor';
import Temp from 'temp';
import fs from 'fs';
import contract from 'truffle-contract';
import path from 'path';

var requireNoCache = require("require-nocache")(module);
var provider = new Web3.providers.HttpProvider("http://localhost:8545");
var temp = Temp.track();

const DINConnectorInstance = {
    contractInst: null,
    toAddress: null,
    toAmount: 0,
    web3: null,
    web3Provider: null,
    balance: 0,
    contracts: {},
    account: null,

    callback: function(error, result) {
        if (!error) {
            console.log(result)
        } else {
            console.log(error)
        }
    },

    getProvider: function() {
        if(this.web3 !== null) {
            this.web3Provider = this.web3.currentProvider;
            this.web3 = new Web3(this.web3Provider);
        } else {
            this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
            this.web3 = new Web3(this.web3Provider);
        }
    },

    getContract: function() {
        var dinRegistryArtifact = require('../contracts/DINRegistry.json');
        this.contracts.dinRegistry = contract(dinRegistryArtifact);
        this.contracts.dinRegistry.setProvider(this.web3Provider);
    },

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

    getAccounts: function() {
        this.web3.eth.getAccounts((error, accounts) => {
            if (error) {
                console.log(error);
                return;
            }
            return accounts;
        });
    },

    createNewDIN: function(account) {
        this.getProvider();
        // this.networkCheck();
        this.getContract();

        this.account = account;
        return this.contracts.dinRegistry.deployed().then((instance) => {
            var contractInstance = instance;
            var event = contractInstance.NewRegistration({owner: this.account});
            event.watch(this.callback);

            return contractInstance.registerNewDIN();
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
