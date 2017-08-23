/* @flow */

import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cuid from 'cuid';
import cors from 'cors';

var Web3 = require('web3');
var fs = require("fs");
var Artifactor = require("truffle-artifactor");
var provider = new Web3.providers.HttpProvider("http://localhost:8545");
var contract = require("truffle-contract");
var temp = require("temp").track();
var path = require("path");
var requireNoCache = require("require-nocache")(module);

const provider = new Web3.providers.HttpProvider("http://localhost:8545");

const eth = {

};

export default eth;
