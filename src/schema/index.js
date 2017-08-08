/* @flow */

import {
    GraphQLSchema,
    GraphQLObjectType
} from 'graphql';

import { userQuery } from './User';
import { notebookQuery } from './Notebook';
import { datasetQuery } from './Dataset';
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
});
