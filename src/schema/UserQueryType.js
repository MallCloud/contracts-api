/* @flow */

import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
} from 'graphql';

import {
    fromGlobalId,
    globalIdField,
    nodeDefinitions,
} from 'graphql-relay';

import { nodeField } from './Node';
import UserType from './UserType';

const UserQueryType = new GraphQLObjectType({

    name: 'UserQuery',
    description: '...',

    fields: () => ({
        allUsers: {
            type: new GraphQLList(UserType),
            resolve: (root, args, {loaders}) => loaders.user.loadAll(),
        },
        node: nodeField,
        user: {
            type: UserType,
            args: {
                id: {type: GraphQLID},
                username: {type: GraphQLString},
                password: {type: GraphQLString},
            },
            resolve: (root, args, {loaders}) => loaders.user.load(args.id)
        },
    }),

});

export default new GraphQLSchema({
    query: UserQueryType,
});
