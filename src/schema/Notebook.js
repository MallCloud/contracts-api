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

import { NotebookType } from './NotebookType';
import { ProductType } from './ProductType';

const notebookQuery = {
    type: NotebookType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
	},
    resolve(root, args) {

    },
};

const createNotebook = mutationWithClientMutationId ({
    name: 'CreateNotebook',
});

const deleteNotebook = mutationWithClientMutationId ({
    name: 'DeleteNotebook',
});

const buyNotebook = mutationWithClientMutationId ({
    name: 'BuyNotebook',
});

const sellNotebook = mutationWithClientMutationId ({
    name: 'SellNotebook',
});

module.exports = {
    notebookQuery,
    createNotebook,
    deleteNotebook,
    buyNotebook,
    sellNotebook,
}
