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
    async mutateCRDataset(input, context) {
        const data = getJSONFromRelativeURL(input.token);
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
    async mutateEDDataset(input, context) {
        const data = getJSONFromRelativeURL(input.token);

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
    async mutateDLDataset(input, context) {
        const data = getJSONFromRelativeURL(input.token);

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
    async mutateBYDataset(input, context) {
        const data = getJSONFromRelativeURL(input.token);

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
    async mutateSLDataset(input, context) {
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
