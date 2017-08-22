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

export const ProductType = new GraphQLObjectType({
    name: 'Product',
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField('Product'),
	}),
});
