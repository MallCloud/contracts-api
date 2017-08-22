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
    apiQuery,
    createAPI,
    editAPI,
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
            editNotebook,
            deleteNotebook,
            buyNotebook,
            sellNotebook,
            createDataset,
            editDataset,
            deleteDataset,
            buyDataset,
            sellDataset,
            createAPI,
            editAPI,
            deleteAPI,
            buyAPI,
            sellAPI,
        },
  }),
});
