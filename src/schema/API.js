/* @flow */
/* eslint-disable import/prefer-default-export */

import validator from 'validator';

import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInt,
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

import DINConnectorInstance from '../connectors/dinRegistryConn';

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
        userid: {
            type: GraphQLInt,
        },

        token: {
            type: GraphQLString,
        },

        details: {
            type: APIDetails,
        },
    },
    outputFields: {
        din: {
            type: GraphQLInt,
        },
    },
    async mutateAndGetPayload(input, context) {
        DINConnectorInstance.createNewDIN(input.token, input.details);
        return getJSONFromRelativeURL(`/api/users/${input.userid}`, input.token)
            .then(function(info) {
                return DINConnectorInstance.createNewDIN(info.blockchain_address);
            })
            .then(function(din) {
                // const product = createNewAPI(input.details, din);
                // connectToPublicResolver(product);
                //
                // var info = {
                //
                // };
                // 
                // sendInfoToPythonAPI(info);
                return din;
            })
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
    async mutateAndGetPayload(input, context) {
        const data = getJSONFromRelativeURL(`/api/users/${input.userid}`, input.token);
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
    async mutateAndGetPayload(input, context) {
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
    async mutateAndGetPayload(input, context) {
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
