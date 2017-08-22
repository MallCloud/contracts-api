/* @flow */
/* eslint-disable import/prefer-default-export */

import validator from 'validator';

import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
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

} from '../connectors/dinRegistryConn';

const notebookQuery = {
    type: NotebookType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
	},
    resolve(root, args) {

    },
};

const createNotebook = mutationWithClientMutationId ({
    name: 'CreateNotebook',
    inputFields: {
        token: {
            type: GraphQLString,
        },

        details: {
            type: NotebookDetails,
        },
    },
    outputFields: {

    },
    async mutateCRNotebook(input, context) {
        const data = getJSONFromRelativeURL(input.token);
        const din = createNewDIN(input.token, input.details);
        const product = createNewNotebook(input.details);

        connectToPublicResolver(product);

        var info = {

        };
        sendInfoToPythonAPI(info);
    },
});

const editNotebook = mutationWithClientMutationId ({
    name: 'EditNotebook',
    inputFields: {
        token: {
            type: GraphQLString,
        },

        details: {
            type: NotebookDetails,
        },
    },
    outputFields: {

    },
    async mutateEDNotebook(input, context) {
        const data = getJSONFromRelativeURL(input.token);
        const productAddress = getProductAddress(input.din);
        editNotebookDetails(input.details);
    },
});

const deleteNotebook = mutationWithClientMutationId ({
    name: 'DeleteNotebook',
    inputFields: {
        token: {
            type: GraphQLString,
        },

        din: {
            type: GraphQLFloat,
        },
    },
    outputFields: {

    },
    async mutateDLNotebook(input, context) {
        const data = getJSONFromRelativeURL(input.token);
        deleteNotebook(input.din, data.blockchain_address);
    },
});

const buyNotebook = mutationWithClientMutationId ({
    name: 'BuyNotebook',
    inputFields: {
        token: {
            type: GraphQLString,
        },

        din: {
            type: GraphQLFloat,
        },
    },
    outputFields: {

    },
    async mutateBYNotebook(input, context) {
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
        token: {
            type: GraphQLString,
        },

        din: {
            type: GraphQLFloat,
        },
    },
    outputFields: {

    },
    async mutateSLNotebook(input, context) {
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
