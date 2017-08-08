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

export const DatasetType = new GraphQLObjectType({
    name: 'Dataset',
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField('Dataset'),

		// user: {
        //     type: UserType,
        //     description: '...',
        //     resolve(obj) {
        //         return obj.user;
        //     },
        // },

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

		rating: {
			type: GraphQLInt,
            description: '...',
            resolve(obj) {
                return obj.rating;
            },
		},

		description: {
            type: GraphQLString,
            description: '...',
            resolve(obj) {
                return obj.description;
            },
        },

		datasetGraphID: {
            type: GraphQLInt,
            description: '...',
            resolve(obj) {
                return obj.data_set_graph_id;
            },
        },

		file: {
			type: GraphQLInt,
            description: '...',
            resolve(obj) {
                return obj.file;
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
