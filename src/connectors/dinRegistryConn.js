// web3 is an Ethereum client library
import Web3 from 'web3';
const web3 = new Web3();

import {
    contractConnector
} from './utils';

const DINRegistryInstance = {
    createNewDIN: function() {
        var dinConn = contractConnector('http://localhost:8545', '../contracts/DINRegistry/json');
    },
};

export default DINRegistryInstance;
