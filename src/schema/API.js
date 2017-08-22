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
