/* @flow */

import {
    GraphQLSchema,
    GraphQLObjectType
} from 'graphql';

import { userQuery } from './User';

import {
    notebookQuery,
    createNotebook,
    deleteNotebook,
    buyNotebook,
    sellNotebook,
} from './Notebook';

import {
    datasetQuery,
    createDataset,
    deleteDataset,
    buyDataset,
    sellDataset,
} from './Dataset';

import {
    apiQuery,
    createAPI,
    deleteAPI,
    buyAPI,
    sellAPI,
} from './API';

import { node, nodes } from './Node';

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            userQuery,
            notebookQuery,
            datasetQuery,
            node,
            nodes,
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createNotebook,
            deleteNotebook,
            buyNotebook,
            sellNotebook,
            createDataset,
            deleteDataset,
            buyDataset,
            sellDataset,
            createAPI,
            deleteAPI,
            buyAPI,
            sellAPI,
        },
  }),
});
