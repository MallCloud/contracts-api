/**
 * Node.js API Starter Kit (https://reactstarter.com/nodejs)
 *
 * Copyright © 2016-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { user } from './User';
import {  } from './Node';
import {  } from './Notebook';
import {  } from './Data';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {

    },
  }),
});
