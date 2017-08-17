/* @flow */
/* eslint-disable import/prefer-default-export */

import validator from 'validator';

import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';

import {
    fromGlobalId,
    connectionDefinitions,
    forwardConnectionArgs,
    connectionFromArraySlice,
    cursorToOffset,
    mutationWithClientMutationId,
} from 'graphql-relay';

import { APIType } from './APIType';
import { ProductType } from './ProductType';

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
})

const deleteAPI = mutationWithClientMutationId ({
    name: 'DeleteAPI',
})

const buyAPI = mutationWithClientMutationId ({
    name: 'BuyAPI',
})

const sellAPI = mutationWithClientMutationId ({
    name: 'SellAPI',
})


module.exports = {
    apiQuery,
    createAPI,
    deleteAPI,
    buyAPI,
    sellAPI,
}
