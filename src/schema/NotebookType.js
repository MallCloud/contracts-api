/* @flow */

import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from './Node';
import UserType from './UserType';

export default new GraphQLObjectType ({
  name: 'Notebook',
  interfaces: [nodeInterface],

  fields: {
    id: globalIdField(),

    title: {
      type: new GraphQLNonNull(GraphQLString),
    },

    author: {
      type: new GraphQLNonNull(UserType),
      resolve(parent, args, { users }) {
        return users.load(parent.author_id);
      },
    },

    url: {
      type: new GraphQLNonNull(GraphQLString),
    },

    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(parent) {
        return parent.created_at;
      },
    },

    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(parent) {
        return parent.updated_at;
      },
    },

    language: {
      type: new GraphQLNonNull(GraphQLString),
    },

    descr: {
      type: GraphQLString,
    },

    /**
     * Possible Access Types :
     * 1. Open : {open}
     * 2. Closed : {close}
     */
    access_type: {
      type: new GraphQLNonNull(GraphQLString),
    },

    base_id: {
      type: new GraphQLNonNull(GraphQLString),
    },

    hash_key: {
      type: new GraphQLNonNull(GraphQLString),
    },

    req_gpu: {
      type: GraphQLBoolean,
    },

    size: {
      type: GraphQLFloat,
    }

  }
});
