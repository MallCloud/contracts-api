/* @flow */

import validator from 'validator';
import {
	GraphQLNonNull,
	GraphQLID,
	GraphQLString
} from 'graphql';

import {
	fromGlobalId,
	mutationWithClientMutationId
} from 'graphql-relay';

import db from '../db';
import NotebookType from './NotebookType';


export const notebook = {
	type: NotebookType,
}
