/* @flow */
/* eslint-disable global-require, no-underscore-dangle */

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';


const { nodeInterface, nodeField: node, nodesField: nodes } = nodeDefinitions(
  (globalId, context) => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'Data') return context.data.load(id);
    if (type === 'Notebook') return context.notebook.load(id);
    if (type === 'User') return context.user.load(id);

    return null;
  },
  (obj) => {
    if (obj.__type === 'Data') return require('./DataType').default;
    if (obj.__type === 'Notebook') return require('./NotebookType').default;
    if (obj.__type === 'User') return require('./UserType').default;

    return null;
  },
);

export { nodeInterface, node, nodes };
