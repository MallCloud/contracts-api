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
    DatasetType,
    DatasetDetails,
} from './DatasetType';

import { ProductType } from './ProductType';
import { DINConnectorInstance } from '../connectors/dinRegistryConn';

const datasetQuery = {
    type: DatasetType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
	},
    resolve(root, args) {

    },
};

const createDataset = mutationWithClientMutationId ({
    name: 'CreateDataset',
    inputFields: {
        token: {
            type: GraphQLString,
        },

        details: {
            type: DatasetDetails,
        },
    },
    outputFields: {

    },
    async mutateAndGetPayload(input, context) {
        return getJSONFromRelativeURL(`/api/users/${input.userid}`, input.token)
            .then(function(info) {
                return DINConnectorInstance.createNewDIN(info.blockchain_address);
            })
            .then(function(din) {
                // const product = createNewDataset(input.details, din);
                // connectToPublicResolver(product);
                //
                // var info = {
                //
                // };
                //
                // sendInfoToPythonAPI(info);
                var result = {
                    din: din
                };

                return result;
            })
    },
});

const editDataset = mutationWithClientMutationId ({
    name: 'EditDataset',
    inputFields: {
        token: {
            type: GraphQLString,
        },

        details: {
            type: DatasetDetails,
        },
    },
    outputFields: {
        outputFields: {
            isEdited: {
                type: GraphQLBoolean,
            },

            details: {
                type: TrainedModelDetails,
            },
        },
    },
    async mutateAndGetPayload(input, context) {
        const data = getJSONFromRelativeURL(input.token);
        const productAddress = getProductAddress(input.din);
        var isEdited = editDatasetDetails(input.details);
        return isEdited;
    },
});

const deleteDataset = mutationWithClientMutationId ({
    name: 'DeleteDataset',
    inputFields: {
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
        var isDeleted = deleteDataset(input.din, data.blockchain_address);
        return isDeleted;
    },
});

const buyDataset = mutationWithClientMutationId ({
    name: 'BuyDataset',
    inputFields: {
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
        const price = getPriceOfProduct(din);
        var balance = checkIfBalanceAvail(data.balance, price);

        if(!balance) {
            console.log('[-] Error: Balance Not Enough');
        } else {
            buyProduct(din);
        }
    },
});

const sellDataset = mutationWithClientMutationId ({
    name: 'SellDataset',
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
    async mutateAndGetPayload(input, context) {
        const data = getJSONFromRelativeURL(input.token);

    },
});

module.exports = {
    datasetQuery,
    createDataset,
    editDataset,
    deleteDataset,
    buyDataset,
    sellDataset,
}
