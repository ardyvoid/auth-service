import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { schema } from './schema';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

global.fetch = require('node-fetch');

const prisma = new PrismaClient();

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    if (!req.headers.token) {
      return { db: prisma };
    }

    const decoded = jwt.verify(
      req.headers.token as string,
      process.env.JWT_SECRET as string,
    );

    const { user } = decoded as { user: any };

    return { user, db: prisma };
  }
});

server.listen({ port: process.env.PORT }).then(() => {
  console.log(`Auth service running on http://localhost:${process.env.PORT}`);
});
