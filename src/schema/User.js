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
    getJSONFromRelativeURL,
} from '../rest/user-api';

export const userQuery = {
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

    	return getJSONFromRelativeURL(`/api/users/${args.id}`, info);
    },
};
