/*
 *  DataMarketplace API.
 */

import Web3 from 'web3';
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

const DataMarketplaceAbi;
const DataMarketplaceConnector;

var DataMarketplaceContractInstance;

/**
 * Connect to the DataMarketplace contract.
 *
 * @return true if connection succeded and false if not.
 */
export function ConnectToDataMarketplaceContract()
{
    try
    {        
        DataMarketplaceAbi = require('../build/contracts/DatasetMarketplace.json').abi;
        DataMarketplaceConnector = web3.eth.contract(DataMarketplaceAbi);
        module.exports = DataMarketplaceConnector;
        return true;               
    }
    catch (ex)
    {
        console.error("Could not connect to data marketplace contract. Error: ", ex);
        return false;
    }
}

/**
 * Create a DataMarketplace contract.
 *
 * @return true if creation succeded and false if not.
 */
export function CreateMarketplace()
{
    try
    {
        var DataMarketplaceContract = web3.eth.contract(DataMarketplaceAbi);
        DataMarketplaceContractInstance = new DataMarketplaceContract();
        return true;
    }
    catch (ex)
    {
        console.error("Could not create data marketplace contract. Error: ", ex);
        return false;
    }
}

/**
 * Adds a business environment to the DataMarketplace contract.
 *
 * @param businessEnvironmentAddress address of business environment.
 *
 * @return true if process succeded and false if not.
 */
export function AddBusinessEnvironment(businessEnvironmentAddress)
{
    try
    {        
        DataMarketplaceContractInstance.AddBusinessEnvironmentToMarketplace(businessEnvironmentAddress, { value: 200, gas: 2000 });
        return true;
    }
    catch (ex)
    {
        console.error("Could not add business environment to marketplace contract. Error: ", ex);
        return false;
    }   
}





