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

const APIType = new GraphQLObjectType({
    name: 'API',
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField('Dataset'),
    }),

});

const APIDetails = new GraphQLInputObjectType({
	name: 'APIDetails',
    interfaces: [nodeInterface],

    fields: () => ({
		solutionName: {
			type: GraphQLString,
			description: '...',
		},

		description: {
			type: GraphQLString,
			description: '...',
		},

		price: {
			type: GraphQLInt,
			description: '...',
		},

		status: {
			type: GraphQLString,
			description: '...',
		},

		modelGraphID: {
			type: GraphQLInt,
			description: '...',
		},
    }),
});

module.exports = {
	APIType,
	APIDetails,
}
