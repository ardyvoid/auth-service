import { UserInputError, ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { validatePasswordUser } from '../../validation';

export const passwordUser = async (parent: any, args: any, context: any) => {
  try {
    const errors = {};
    if (!validatePasswordUser(args, errors)) {
      throw new UserInputError('Bad Request', errors);
    }

    const { id, password, code } = args;
    let user = await context.db.authUser.findUnique({ where: { id } });

    if (!user || !user.code) {
      throw new ApolloError('Invalid credentials');
    }

    const codeMatch = bcrypt.compareSync(code, user.code);

    if (!codeMatch) {
      throw new ApolloError('Invalid credentials');
    }

    user = await context.db.authUser.update({
      data: {
        password: bcrypt.hashSync(password, 12),
        code: null
      },
      where: { id: user.id }
    });

    return true;
  } catch (error) {
    throw error;
  }
};
