/* @flow */

import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import { nodeInterface } from './Node';
import UserType from './UserType';

export default new GraphQLObjectType ({
  name: 'Transaction',
	interfaces: [ nodeInterface ],

	fields: {
    id: globalIdField(),

    author: {
      type: new GraphQLNonNull(UserType),
      resolve(parent, args, { users }) {
        return users.load(parent.author_id);
      },
    },

    buyer: {
      type: new GraphQLNonNull(UserType),
      resolve(parent, args, { users }) {
        return users.load(parent.buyer_id);
      },
    }

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

    price: {
      type: new GraphQLNonNull(GraphQLFloat),
    },

    desc: {
      type: GraphQLString,
    },
	},
});
