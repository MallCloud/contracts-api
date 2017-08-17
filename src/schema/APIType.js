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

export const APIType = new GraphQLObjectType({
    name: 'Dataset',
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField('Dataset'),
    }),

});
