/* @flow */
/* eslint-disable import/prefer-default-export */

import validator from 'validator';

import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql';

import { DatasetType } from './DatasetType';

export const datasetQuery = {
    type: DatasetType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
	},
    resolve(root, args) {

    },
};
