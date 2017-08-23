/* @flow */
/* eslint-disable import/prefer-default-export */

import validator from 'validator';

import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';

import { UserType } from './UserType';

import {
    getJSONFromRelativeURLUsingCred,
} from '../rest/user-api';

const userQuery = {
    type: UserType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
	},
    resolve(root, args) {
        var info = {
            "username": args.username,
            "password": args.password
    	};

    	return getJSONFromRelativeURLUsingCred(`/api/users/${args.id}`, info);
    },
};

module.exports = {
    userQuery,
}
