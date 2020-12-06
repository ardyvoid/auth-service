import { secure } from '../../utils';

export const findUser = async (parent: any, args: any, context: any, info: any) => {
  try {
    secure(context);

    const { id } = args;
    const user = await context.db.authUser.findUnique({ where: { id } });

    return user;
  } catch (error) {
    throw error;
  }
};
