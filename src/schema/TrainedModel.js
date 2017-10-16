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
    TrainedModelType,
    TrainedModelDetails,
} from './TrainedModelType';
import { ProductType } from './ProductType';

import {
    getJSONFromRelativeURL,
    getJSONFromRelativeURLUsingCred,
} from '../rest/user-api';

import DINConnectorInstance from '../connectors/createDIN';

const tmQuery = {
    type: TrainedModelType,

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

    	return getJSONFromRelativeURLUsingCred(`/api/trainedmodels/${args.id}`, info);
    },
};

const createTrainedModel = mutationWithClientMutationId ({
    name: 'CreateTrainedModel',
    inputFields: {
        userid: {
            type: GraphQLInt,
        },

        token: {
            type: GraphQLString,
        },

        details: {
            type: TrainedModelDetails,
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
                console.log(info.blockchain_address);
                return DINConnectorInstance.createNewDIN(info.blockchain_address);
            })
            .then(function(din, auth) {
                // const product = createNewTrainedModel(input.details, din);
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

const editTrainedModel = mutationWithClientMutationId ({
    name: 'EditTrainedModel',
    inputFields: {
        userid: {
            type: GraphQLInt,
        },

        token: {
            type: GraphQLString,
        },

        details: {
            type: TrainedModelDetails,
        },
    },
    outputFields: {
        isEdited: {
            type: GraphQLBoolean,
        },

        // details: {
        //     type: TrainedModelDetails,
        // },
    },
    async mutateAndGetPayload(input, context) {
        const data = getJSONFromRelativeURL(`/api/users/${input.userid}`, input.token);
        const productAddress = getProductAddress(input.din);
        var isEdited = editTrainedModelDetails(input.details);
        return isEdited;
    },
});

const deleteTrainedModel = mutationWithClientMutationId ({
    name: 'DeleteTrainedModel',
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
        var isDeleted = deleteTrainedModel(input.din, data.blockchain_address);
        return isDeleted;
    },
});

const buyTrainedModel = mutationWithClientMutationId ({
    name: 'BuyTrainedModel',
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
        const price = getPriceOfProduct(din);
        var balance = checkIfBalanceAvail(data.balance, price);

        if(!balance) {
            console.log('[-] Error: Balance Not Enough');
        } else {
            buyProduct(din);
        }
    },
});

const sellTrainedModel = mutationWithClientMutationId ({
    name: 'SellTrainedModel',
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
    tmQuery,
    createTrainedModel,
    editTrainedModel,
    deleteTrainedModel,
    buyTrainedModel,
    sellTrainedModel,
}
