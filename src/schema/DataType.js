/* @flow */

import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLID,
} from 'graphql';

import { globalIdField } from 'graphql-relay';
import { nodeInterface } from './Node';
import UserType from './UserType';

export default new GraphQLObjectType ({
    name: 'Data',
    interfaces: [nodeInterface],

    fields: () => ({
        id: globalIdField(),

        user: {
            type: GraphQLID,
            resolve(obj, args, {loaders}) {
                // return users.load(obj.author_id);
            },
        },

        type: {
            type: GraphQLInt,
            resolve(obj) {
                return obj.type;
            }
        },

        price: {
            type: GraphQLFloat,
            resolve(obj) {
                return obj.price;
            }
        },

        accessParameters: {
            type: GraphQLString,
            resolve(obj) {
                return obj.accessparameters;
            }
        },

        rating:  {
            type: GraphQLInt,
            resolve(obj) {
                return obj.rating;
            }
        },

        description: {
            type: GraphQLString,
            resolve(obj) {
                return obj.description;
            },
        },

        datafields: {
            type: new GraphQLList(GraphQLString),
            resolve(obj) {
                return obj.datafields;
            },
        },

        datasetGraphID: {
            type: GraphQLID,
            resolve(obj) {
                return obj.data_set_graph_id;
            },
        },

        files:  {
            type: GraphQLInt,
            resolve(obj) {
                return obj.file;
            },
        },

        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve(obj) {
                return obj.created_at;
            },
        },

        updatedAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve(obj) {
                return obj.updated_at;
            },
        },

        /**
        * Possible Access Types:
        * 1. Open : {open}
        * 2. Closed : {close}
        * 3. Restricted : {rest}
        */
        // [!] not available right now
        // access_ type: {
        //     type: new GraphQLNonNull(GraphQLString),
        // },
        //
        // base_id: {
        //     type: new GraphQLNonNull(GraphQLString),
        // },
        //
        // checksum: {
        //     type: new GraphQLNonNull(GraphQLString),
        // },
        //
        // size: {
        //     type: GraphQLFloat,
        // },

    })

});
