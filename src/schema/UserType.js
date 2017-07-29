/* @flow */

import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLFloat } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from './Node';

export default new GraphQLObjectType ({
	name: 'User',
	interfaces: [ nodeInterface ],

	fields: {
		id: globalIdField(),

		profileName: {
			type: GraphQLString,
		},

		commissionRate: {
			type: new GraphQLNonNull(GraphQLFloat),
		},

		numberTransaction: {
			type: new GraphQLNonNull(GraphQLInt),
		},

		rating: {
			type: GraphQLInt,
		},

		notebooks: {
			type: new GraphQLList(GraphQLString),
		},

		data: {
			type: new GraphQLList(GraphQLString),
		}
	},
});
