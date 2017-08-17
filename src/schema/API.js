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
    type: ProductType,
})

const deleteAPI = mutationWithClientMutationId ({
    name: 'DeleteAPI',
    type: ProductType,
})

const buyAPI = mutationWithClientMutationId ({
    name: 'BuyAPI',
    type: ProductType,
})

const sellAPI = mutationWithClientMutationId ({
    name: 'SellAPI',
    type: ProductType,
})


module.exports = {
    apiQuery,
    createAPI,
    deleteAPI,
    buyAPI,
    sellAPI,
}
