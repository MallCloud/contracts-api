## GraphQL Schema

```
import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { user } from './User';
import {  } from './Node';
import {  } from './Notebook';
import {  } from './Data';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user
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
