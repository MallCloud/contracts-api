/* @flow */

import {
	GraphQLObjectType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLString,
	GraphQLFloat,
    GraphQLBoolean,
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import { nodeInterface } from './Node';

import UserType from './UserType';

export const NotebookType = new GraphQLObjectType({
    name: 'Notebook',
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField('Notebook'),

        type: {
            type: GraphQLInt,
            description: '...',
            resolve(obj) {
                return obj.type;
            },
        },

        price: {
            type: GraphQLFloat,
            description: '...',
            resolve(obj) {
                return obj.price;
            },
        },

        accessParameters: {
            type: new GraphQLList(GraphQLString),
            description: '...',
            resolve(obj) {
                return obj.accessparameters;
            },
        },

        description: {
            type: GraphQLString,
            description: '...',
            resolve(obj) {
                return obj.description;
            },
        },

        modelGraphID: {
            type: GraphQLInt,
            description: '...',
            resolve(obj) {
                return obj.model_graph_id;
            },
        },

        language: {
            type: GraphQLString,
            description: '...',
            resolve(obj) {
                return obj.language;
            },
        },

        // author: {
        //     type: new GraphQLNonNull(UserType),
        //     description: '...',
        //     resolve(obj) {
        //         return obj.author;
        //     },
        // },

        ensemble: {
            type: GraphQLString,
            description: '...',
            resolve(obj) {
                return obj.ensemble;
            },
        },

        metaEnsemble: {
            type: GraphQLString,
            description: '...',
            resolve(obj) {
                return obj.metaensemble;
            },
        },

        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve(parent) {
                return parent.created_at;
            },
        },

        updatedAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve(parent) {
                return parent.updated_at;
            },
        },

    }),

});
