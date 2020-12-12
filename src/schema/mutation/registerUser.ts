import bcrypt from 'bcrypt';
import { UserInputError } from 'apollo-server';
import { generateCode } from '../../utils';
import { validateRegisterUser } from '../../validation';

export const registerUser = async (parent: any, args: any, context: any) => {
  try {
    const errors = {};
    const valid = await validateRegisterUser(context.db, args, errors);
    if (!valid) {
      throw new UserInputError('Bad Request', errors);
    }

    const code = generateCode();
    const { username, email } = args;
    const user = await context.db.authUser.create({
      email: email,
      roles: { set: 'REGISTERED' },
      code: bcrypt.hashSync(code, 12)
    });

    return { id: user.id, code: user.code };
  } catch (error) {
    throw error;
  }
};
