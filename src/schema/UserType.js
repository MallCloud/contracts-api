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

export const UserType = new GraphQLObjectType({
    name: 'User',
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField('User'),

        username: {
            type: GraphQLString,
            description: '...',
            resolve: obj => obj.username,
        },

        email: {
            type: GraphQLString,
            description: '...',
            resolve(obj) {
                return obj.email;
            },
        },

        firstName: {
            type: GraphQLString,
            description: '...',
            resolve(obj) {
                return obj.first_name;
            },
        },

        lastName: {
            type: GraphQLString,
            description: '...',
            resolve(obj) {
                return obj.last_name;
            },
        },

        type: {
            type: GraphQLInt,
            description: '...',
            resolve(obj) {
                return obj.type;
            },
        },

        isStaff: {
            type: GraphQLBoolean,
            description: '...',
            resolve(obj) {
                return obj.is_staff;
            },
        },

        experience: {
            type: new GraphQLList(GraphQLString),
            description: '...',
            resolve(obj) {
                return obj.experience;
            },
        },

        specialSkills: {
            type: new GraphQLList(GraphQLString),
            description: '...',
            resolve(obj) {
                return obj.special_skills;
            },
        },

        blockchain_address: {
            type: GraphQLString,
            description: '...',
            resolve(obj) {
                return obj.blockchain_address;
            },
        },
    }),

});
