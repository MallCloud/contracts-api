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

import { DatasetType } from './DatasetType';
import { ProductType } from './ProductType';

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
});

const deleteDataset = mutationWithClientMutationId ({
    name: 'DeleteDataset',
});

const buyDataset = mutationWithClientMutationId ({
    name: 'BuyDataset',
});

const sellDataset = mutationWithClientMutationId ({
    name: 'SellDataset',
});

module.exports = {
    datasetQuery,
    createDataset,
    deleteDataset,
    buyDataset,
    sellDataset,
}
