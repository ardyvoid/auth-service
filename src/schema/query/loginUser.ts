import bcrypt from 'bcrypt';
import { ApolloError } from 'apollo-server';
import jwt from 'jsonwebtoken';

export const loginUser = async (parent: any, args: any, context: any, info: any) => {
  try {
    const { email, password } = args;
    const user = await context.db.authUser.findUnique({ where: { email } });

    if (!user) {
      throw new ApolloError('Invalid credentials');
    }

    const passwordMatch = bcrypt.compareSync(password, user.password as string);

    if (!passwordMatch) {
      throw new ApolloError('Invalid credentials');
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, { expiresIn: 36000 });

    return { token };
  } catch (error) {
    throw error;
  }
};
