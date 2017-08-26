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

const TrainedModelType = new GraphQLObjectType({
    name: 'TrainedModel',
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField('Dataset'),
    }),

});

const TrainedModelDetails = new GraphQLInputObjectType({
	name: 'TrainedModelDetails',
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
	TrainedModelType,
	TrainedModelDetails,
}
