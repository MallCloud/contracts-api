/* @flow */

import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import nodeInterface from './Node';

export default new GraphQLObjectType ({
	name: 'User',
	interfaces: [ nodeInterface ],

	fields: {
		id: globalIdField(),
	},
});
