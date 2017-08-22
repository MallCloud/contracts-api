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
            createAPI,
            editAPI,
            deleteAPI,
            buyAPI,
            sellAPI,
        },
    }),
});

```

### Top Level Fields

* Data
* Notebook
* Transaction
* User
* Node

### GraphQL Custom Types

* DataType
* NotebookType
* TransactionType
* UserType

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
* createAPI
* editAPI
* deleteAPI
* buyAPI
* sellAPI
