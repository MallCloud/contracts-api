## GraphQL Schema

```
import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { user } from './User';
import { nodeField, nodesField } from './Node';
import { notebook } from './Notebook';
import { data } from './Data';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user,
      node,
      nodes,
      notebook,
      data
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {

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
