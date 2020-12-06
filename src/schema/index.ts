import { buildFederatedSchema } from '@apollo/federation';
import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';

export const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
