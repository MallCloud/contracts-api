/* @flow */
/* eslint-disable import/prefer-default-export */

import validator from 'validator';

import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInt,
    GraphQLBoolean,
} from 'graphql';

import {
    fromGlobalId,
    connectionDefinitions,
    forwardConnectionArgs,
    connectionFromArraySlice,
    cursorToOffset,
    mutationWithClientMutationId,
} from 'graphql-relay';

import {
    NotebookType,
    NotebookDetails,
} from './NotebookType';

import { ProductType } from './ProductType';

import {
    getJSONFromRelativeURL,
    getJSONFromRelativeURLUsingCred,
} from '../rest/user-api';

import DINConnectorInstance from '../connectors/createDIN';

const notebookQuery = {
    type: NotebookType,

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

    	return getJSONFromRelativeURLUsingCred(`/api/notebooks/${args.id}`, info);
    },
};

const createNotebook = mutationWithClientMutationId ({
    name: 'CreateNotebook',
    inputFields: {
        userid: {
            type: GraphQLInt,
        },

        token: {
            type: GraphQLString,
        },

        details: {
            type: NotebookDetails,
        },
    },
    outputFields: {
        din: {
            type: GraphQLInt,
        },

        accessAuth: {
            type: GraphQLString,
        },
    },
    async mutateAndGetPayload(input, context) {
        return getJSONFromRelativeURL(`/api/users/${input.userid}`, input.token)
            .then(function(info) {
                return DINConnectorInstance.createNewDIN(info.blockchain_address);
            })
            .then(function(din, auth) {
                // const product = createNewNotebook(input.details, din);
                // connectToPublicResolver(product);
                //
                // var info = {
                //
                // };
                //
                // sendInfoToPythonAPI(info);
                var result = {
                    din: din,
                    accessAuth: auth
                };

                return result;
            })
    },
});

const editNotebook = mutationWithClientMutationId ({
    name: 'EditNotebook',
    inputFields: {
        userid: {
            type: GraphQLInt,
        },

        token: {
            type: GraphQLString,
        },

        details: {
            type: NotebookDetails,
        },
    },
    outputFields: {
        isEdited: {
            type: GraphQLBoolean,
        },

        // details: {
        //     type: NotebookDetails,
        // },
    },
    async mutateAndGetPayload(input, context) {
        const data = getJSONFromRelativeURL(input.token);
        const productAddress = getProductAddress(input.din);
        var isEdited = editNotebookDetails(input.details);
        return true;
    },
});

const deleteNotebook = mutationWithClientMutationId ({
    name: 'DeleteNotebook',
    inputFields: {
        userid: {
            type: GraphQLInt,
        },

        token: {
            type: GraphQLString,
        },

        din: {
            type: GraphQLFloat,
        },
    },
    outputFields: {
        isDeleted: {
            type: GraphQLBoolean,
        },
    },
    async mutateAndGetPayload(input, context) {
        const data = getJSONFromRelativeURL(input.token);
        var isDeleted = deleteNotebook(input.din, data.blockchain_address);
        return isDeleted;
    },
});

const buyNotebook = mutationWithClientMutationId ({
    name: 'BuyNotebook',
    inputFields: {
        userid: {
            type: GraphQLInt,
        },

        token: {
            type: GraphQLString,
        },

        din: {
            type: GraphQLFloat,
        },
    },
    outputFields: {
        din: {
            type: GraphQLFloat,
        },

        accessAuth: {
            type: GraphQLString,
        },
    },
    async mutateAndGetPayload(input, context) {
        const data = getJSONFromRelativeURL(input.token);
        const price = getPriceOfProduce(din);
        var balance = checkIfBalanceAvail(data.balance, price);

        if(!balance) {
            console.log('[-] Error: Balance Not Enough');
        } else {
            buyProduct(din);
        }
    },
});

const sellNotebook = mutationWithClientMutationId ({
    name: 'SellNotebook',
    inputFields: {
        userid: {
            type: GraphQLInt,
        },

        token: {
            type: GraphQLString,
        },

        din: {
            type: GraphQLFloat,
        },
    },
    outputFields: {

    },
    async mutateAndGetPayload(input, context) {
        const data = getJSONFromRelativeURL(input.token);

    },
});

module.exports = {
    notebookQuery,
    createNotebook,
    editNotebook,
    deleteNotebook,
    buyNotebook,
    sellNotebook,
}
