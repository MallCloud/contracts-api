/* @flow */
/* eslint-disable import/prefer-default-export */

import validator from 'validator';

import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
} from 'graphql';

import {
    fromGlobalId,
    connectionDefinitions,
    forwardConnectionArgs,
    connectionFromArraySlice,
    cursorToOffset,
    mutationWithClientMutationId,
} from 'graphql-relay';

import {
    DatasetType,
    DatasetDetails,
} from './DatasetType';

import { ProductType } from './ProductType';
import { dinRegistryInstance } from '../connectors/dinRegistryConn';

const datasetQuery = {
    type: DatasetType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
	},
    resolve(root, args) {

    },
};

const createDataset = mutationWithClientMutationId ({
    name: 'CreateDataset',
    inputFields: {
        token: {
            type: GraphQLString,
        },

        details: {
            type: DatasetDetails,
        },
    },
    outputFields: {

    },
    async mutateAndGetPayload(input, context) {
        const data = getJSONFromRelativeURL(input.token);
        const din = dinRegistryInstance.createNewDIN(input.token, input.details);
        const product = createNewDataset(input.details);

        connectToPublicResolver(product);

        var info = {

        };
        sendInfoToPythonAPI(info);
    },
});

const editDataset = mutationWithClientMutationId ({
    name: 'EditDataset',
    inputFields: {
        token: {
            type: GraphQLString,
        },

        details: {
            type: DatasetDetails,
        },
    },
    outputFields: {

    },
    async mutateAndGetPayload(input, context) {
        const data = getJSONFromRelativeURL(input.token);
        const productAddress = getProductAddress(input.din);
        editDatasetDetails(input.details);
    },
});

const deleteDataset = mutationWithClientMutationId ({
    name: 'DeleteDataset',
    inputFields: {
        token: {
            type: GraphQLString,
        },

        din: {
            type: GraphQLFloat,
        },
    },
    outputFields: {

    },
    async mutateAndGetPayload(input, context) {
        const data = getJSONFromRelativeURL(input.token);
        deleteDataset(input.din, data.blockchain_address);
    },
});

const buyDataset = mutationWithClientMutationId ({
    name: 'BuyDataset',
    inputFields: {
        token: {
            type: GraphQLString,
        },

        din: {
            type: GraphQLFloat,
        },
    },
    outputFields: {

    },
    async mutateAndGetPayload(input, context) {
        const data = getJSONFromRelativeURL(input.token);
        const price = getPriceOfProduct(din);
        var balance = checkIfBalanceAvail(data.balance, price);

        if(!balance) {
            console.log('[-] Error: Balance Not Enough');
        } else {
            buyProduct(din);
        }
    },
});

const sellDataset = mutationWithClientMutationId ({
    name: 'SellDataset',
    inputFields: {
        token: {
            type: GraphQLString,
        },

        din: {
            type: GraphQLFloat,
        },
    },
    outputFields: {

    },
    async mutateAndGetPayload(input, context) {
        const data = getJSONFromRelativeURL(input.token);

    },
});

module.exports = {
    datasetQuery,
    createDataset,
    editDataset,
    deleteDataset,
    buyDataset,
    sellDataset,
}
