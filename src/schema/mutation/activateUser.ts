import bcrypt from 'bcrypt';
import { UserInputError, ApolloError } from 'apollo-server';
import { generateCode } from '../../utils';
import { validateActivateUser } from '../../validation';

export const activateUser = async (parent: any, args: any, context: any) => {
  try {
    const errors = {};
    if (!validateActivateUser(args, errors)) {
      throw new UserInputError('Bad Request', errors);
    }

    const { id, code } = args;
    let user = await context.db.authUser.findUnique({ where: { id } });

    if (!user || !user.code) {
      throw new ApolloError('Invalid credentials');
    }

    const codeMatch = bcrypt.compareSync(code, user.code);

    if (!codeMatch) {
      throw new ApolloError('Invalid credentials');
    }

    const nextCode = generateCode();

    user = await context.db.authUser.update({
      data: {
        roles: { set: 'USER' },
        code: bcrypt.hashSync(nextCode, 12),
        active: true
      },
      where: { id: user.id }
    });

    return { id: user.id, code: nextCode };
  } catch (error) {
    throw error;
  }
};
