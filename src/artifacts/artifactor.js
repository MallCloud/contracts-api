var Web3 = require('web3');
var Artifactor = require("truffle-artifactor");
var contract = require("truffle-contract");
var requireNoCache = require("require-nocache")(module);
var fs = require("fs");
var temp = require("temp").track();
var path = require("path");

var provider = new Web3.providers.HttpProvider("http://localhost:8545");
const artifactor = new Artifactor(my_path);
const currPath = '';

const allcontracts_data = {
    "DINRegistry": {
        "abi":
    }
}

function createArtifact(data, relativeURL) {
    artifactor.save(contract_data)
        .then(function() {
            expPath = currPath + relativeURL;

            var json = requireNoCache(expPath);
            ContractConn = contract(json);
            ContractConn.setProvider(provider);
        })
}

function createArtifacts(data, relativeURL) {
    artifactor.saveAll(allcontracts_data, '../artifacts');
}

module.exports = {
    createArtifact,
    createArtifacts
}
