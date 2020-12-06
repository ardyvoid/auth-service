import bcrypt from 'bcrypt';
import { UserInputError } from 'apollo-server';
import { generateCode } from '../../utils';
import { validateResetUser } from '../../validation';

export const resetUser = async (parent: any, args: any, context: any) => {
  try {
    const errors = {};
    if (!validateResetUser(args, errors)) {
      throw new UserInputError('Bad Request', errors);
    }

    const { email } = args;
    const user = await context.db.authUser.findUnique({ where: { email } });

    if (!user) {
      return { id: 0 };
    }

    const code = generateCode();
    await context.db.authUser.update({
      data: { code: bcrypt.hashSync(code, 12) },
      where: { id: user.id }
    });

    return { id: user.id };
  } catch (error) {
    throw error;
  }
};
