/* @flow */

import {
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLString,
	GraphQLFloat,
    GraphQLBoolean,
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import { nodeInterface } from './Node';

const DatasetType = new GraphQLObjectType({
    name: 'Dataset',
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField('Dataset'),

		user: {
            type: GraphQLInt,
            description: 'Returns an User ID that can be used to fetch user data',
            resolve(obj) {
                return obj.user;
            },
        },

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

const DatasetDetails = new GraphQLInputObjectType({
	name: 'DatasetDetails',
    interfaces: [nodeInterface],

    fields: () => ({
		solutionName: {
			type: GraphQLString,
			description: '...',
		},

		category: {
			type: GraphQLString,
			description: '...',
		},

		parent: {
			type: GraphQLString,
			description: '...',
		},

		type: {
			type: GraphQLInt,
			description: '...',
		},

		file: {
			type: GraphQLInt,
			description: '...',
		},

        description: {
            type: GraphQLString,
            description: '...',
        },

		price: {
			type: GraphQLFloat,
			description: '...',
		},

		rating: {
            type: GraphQLString,
            description: '...',
        },

		status: {
			type: GraphQLString,
			description: '...',
		},

        accessParameters: {
            type: new GraphQLList(GraphQLString),
            description: '...',
        },

        modelGraphID: {
            type: GraphQLInt,
            description: '...',
        },
    }),
});

module.exports = {
	DatasetType,
	DatasetDetails,
}
