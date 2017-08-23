// web3 is an Ethereum client library
import Web3 from 'web3';
const web3 = new Web3();

const DINRegistryInstance = {
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
        if(typeof this.web3 !== 'undefined') {
            this.web3Provider = this.web3.currentProvider;
            this.web3 = new Web3(this.web3Provider);
        } else {
            this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
            this.web3 = new Web3(web3Provider);
        }
    },

    getContractInstance: function() {
        var DINRegistryArtifact = require('./build/contracts/DINRegistry.json');
        this.contracts.DINRegistry = contract(DINRegistryArtifact);
        this.contracts.DINRegistry.setProvider(this.web3Provider);
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

    createNewDIN: function() {
        // this.networkCheck();

        this.contractInst = this.getContractInstance();
        web3.eth.getAccounts((error, accounts) => {
            if (error) {
                console.log(error);
                return;
            }

            this.account = accounts[0];
            console.log(accounts);

            return this.contracts.DINRegistry.deployed().then((instance) => {
                var DINRegistryInstance = instance;
                var event = DINRegistryInstance.NewRegistration({owner: account});
                event.watch(this.callback);

                var newDIN = DINRegistryInstance.registerNewDIN();
                return newDIN;
            })
            .then((result) => {
                console.log('new din is ' + result);
            })
            .catch((err) => {
                console.log(err.message);
            })
        })
    },
};

export default DINRegistryInstance;
