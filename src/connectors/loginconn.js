// web3 is an Ethereum client library
import Web3 from 'web3';
const web3 = new Web3();

/*
 *  Login API.
 */
var LoginConnectionInstance = {
    /**
     * Connect to the Login contract.
     */
    ConnectToLoginContract: function (url='http://localhost:8545') {
        try {
            web3.setProvider(new web3.providers.HttpProvider(url));

            // This file is generated by the Solidity compiler to easily interact with
            // the contract using the web3 library.
            const loginAbi = require('../contracts/Login.json').abi;
            const LoginConnector = web3.eth.contract(loginAbi);
        }

        catch (e) {
            console.error("Could not connect to login contract. Error: ", ex);
        }

        finally {
            // cleanup
        }
    },
  
   /*
    * Login attempt event handling wire up.
    */
    LoginAttemptEventWiringUp: function (senderArgs, challenge) {        
        var LoginAttemptEvent = LoginConnectionInstance.LoginAttempt({ sender: senderArgs, challenge: challenge },
                                                                     { fromBlock: 0, toBlock: 'latest' });
        LoginAttemptEvent.watch(function (error, result) {
            if (!error)
                console.log(result);
        });

        // would get all past logs again.
        var LoginAttemptResults = LoginAttemptEvent.get(function (error, logs) { console.log(logs); });
    }

};

export default LoginConnectionInstance;
