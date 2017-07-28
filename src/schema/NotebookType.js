/* @flow */

import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import noderInterface from './Node';
import UserType from './UserType';

export default new GraphQLObjectType ({
  name: 'Notebook',
  interfaces: [noderInterface],

  fields: {
    id: globalIdField(),

    title: {
      type: new GraphQLNonNull(GraphQLString),
    },

    author: {
      type: new GraphQLNonNull(UserType),
      resolve(parent args, { users }) {
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

    access_type: {
      type: new GraphQLNonNull(GraphQLString),
    },



  }
});
