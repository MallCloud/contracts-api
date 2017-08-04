/* @flow */

import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';

import {
    fromGlobalId,
    globalIdField,
    nodeDefinitions,
} from 'graphql-relay';

import { nodeField } from './Node';
import UserType from './UserType';

export default new GraphQLObjectType({

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
                type: new GraphQLNonNull(GraphQLID),
            },
            resolve: (root, args, {loaders}) => loaders.user.load(args.username)
        },
    }),

});
