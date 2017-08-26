/* @flow */

import {
    GraphQLSchema,
    GraphQLObjectType
} from 'graphql';

import { userQuery } from './User';

import {
    notebookQuery,
    createNotebook,
    editNotebook,
    deleteNotebook,
    buyNotebook,
    sellNotebook,
} from './Notebook';

import {
    datasetQuery,
    createDataset,
    editDataset,
    deleteDataset,
    buyDataset,
    sellDataset,
} from './Dataset';

import {
    tmQuery,
    createTrainedModel,
    editTrainedModel,
    deleteTrainedModel,
    buyTrainedModel,
    sellTrainedModel,
} from './TrainedModel';

import { node, nodes } from './Node';

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            userQuery,
            notebookQuery,
            datasetQuery,
            tmQuery,
            node,
            nodes,
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createNotebook,
            editNotebook,
            deleteNotebook,
            buyNotebook,
            sellNotebook,
            createDataset,
            editDataset,
            deleteDataset,
            buyDataset,
            sellDataset,
            createTrainedModel,
            editTrainedModel,
            deleteTrainedModel,
            buyTrainedModel,
            sellTrainedModel,
        },
    }),
});
