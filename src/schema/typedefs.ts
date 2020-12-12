import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDefs: DocumentNode = gql`
  type AuthUser @key(fields: "id") {
    id: ID!
    username: String!
    email: String
    role: String
    active: Boolean
    createdAt: String
  }

  type AuthUserID {
    id: ID!
  }

  type AuthCode {
    id: ID!
    code: String!
  }

  type AuthToken {
    token: String!
  }

  type AuthSuccess {
    success: Boolean!
  }

  type AuthExists {
    exists: Boolean!
  }

  type Query {
    loginUser(username: String!, password: String!): AuthToken
    findUser(id: ID!): AuthUser
    findUsername(username: String!): AuthExists
    findEmail(email: String!): AuthExists
    authedUser: AuthUser
  }

  type Mutation {
    registerUser(username: String!, email: String!): AuthUserID
    resetUser(email: String!): AuthSuccess
    activateUser(id: String!, code: String!): AuthCode
    passwordUser(id: String!, code: String!, password: String!): AuthSuccess
  }
`;
