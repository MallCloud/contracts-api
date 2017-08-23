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
    APIType,
    APIDetails,
} from './APIType';
import { ProductType } from './ProductType';

import {
    getJSONFromRelativeURL,
    getJSONFromRelativeURLUsingCred,
} from '../rest/user-api';

import { dinRegistryInstance } from '../connectors/dinRegistryConn';

const apiQuery = {
    type: APIType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
	},
    resolve(root, args) {

    },
};

const createAPI = mutationWithClientMutationId ({
    name: 'CreateAPI',
    inputFields: {
        token: {
            type: GraphQLString,
        },

        details: {
            type: APIDetails,
        },
    },
    outputFields: {

    },
    async mutateCRAPI(input, context) {
        const data = getJSONFromRelativeURL(input.token);
        const din = dinRegistryInstance.createNewDIN(input.token, input.details);
        const product = createNewAPI(input.details, din);

        connectToPublicResolver(product);

        var info = {

        };
        sendInfoToPythonAPI(info);
    },
});

const editAPI = mutationWithClientMutationId ({
    name: 'EditAPI',
    inputFields: {
        token: {
            type: GraphQLString,
        },

        details: {
            type: APIDetails,
        },
    },
    outputFields: {

    },
    async mutateEDAPI(input, context) {
        const data = getJSONFromRelativeURL(input.token);
        const productAddress = getProductAddress(input.din);
        editAPIDetails(input.details);
    },
});

const deleteAPI = mutationWithClientMutationId ({
    name: 'DeleteAPI',
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
    async mutateDLAPI(input, context) {
        const data = getJSONFromRelativeURL(input.token);
        deleteAPI(input.din, data.blockchain_address);
    },
});

const buyAPI = mutationWithClientMutationId ({
    name: 'BuyAPI',
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
    async mutateBYAPI(input, context) {
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

const sellAPI = mutationWithClientMutationId ({
    name: 'SellAPI',
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
    async mutateSLAPI(input, context) {
        const data = getJSONFromRelativeURL(input.token);

    },
});


module.exports = {
    apiQuery,
    createAPI,
    editAPI,
    deleteAPI,
    buyAPI,
    sellAPI,
}
