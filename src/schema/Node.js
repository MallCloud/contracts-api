/* @flow */
/* eslint-disable global-require, no-underscore-dangle */

import {
    nodeDefinitions,
    fromGlobalId
} from 'graphql-relay';


const {
    nodeField,
    nodesField,
    nodeInterface,
} = nodeDefinitions(
  (globalId, {loaders}) => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'Data') return loaders.data.load(id);
    if (type === 'Notebook') return loaders.notebook.load(id);
    if (type === 'User') return loaders.user.load(id);

    return null;
  },
  (obj) => {
    if (obj.__type === 'Data') return require('./DataType').default;
    if (obj.__type === 'Notebook') return require('./NotebookType').default;
    if (obj.__type === 'User') return require('./UserType').default;

    return null;
  },
);

export { nodeInterface, nodeField, nodesField };
