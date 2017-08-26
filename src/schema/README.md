# GraphQL Schema

```js
import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { userQuery } from './User';
import { node, nodes } from './Node';
import { notebookQuery } from './Notebook';
import { datasetQuery } from './Data';

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            userQuery,
            notebookQuery,
            datasetQuery,
            node,
            nodes,
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createNotebook,
            editNotebook,
            deleteNotebook,
            buyNotebook,
            sellNotebook,
            createDataset,
            editDataset,
            deleteDataset,
            buyDataset,
            sellDataset,
            createTrainedModel,
            editTrainedModel,
            deleteTrainedModel,
            buyTrainedModel,
            sellTrainedModel,
        },
    }),
});

```

### Top Level Fields

* Data
* Notebook
* Transaction
* TrainedModel
* User
* Node

### GraphQL Custom Types

* DataType
* NotebookType
* TransactionType
* UserType
* ProductType
* TrainedModelType

### GraphQL Mutations

* createNotebook
* editNotebook
* deleteNotebook
* buyNotebook
* sellNotebook
* createDataset
* editDataset
* deleteDataset
* buyDataset
* sellDataset
* createTrainedModel
* editTrainedModel
* deleteTrainedModel
* buyTrainedModel
* sellTrainedModel
