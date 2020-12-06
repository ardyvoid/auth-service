import { secure } from '../../utils';

export const authedUser = async (parent: any, args: any, context: any, info: any) => {
  try {
    const authedUser = secure(context);
    const user = await context.db.authUser.findUnique({ where: { id: authedUser.id } });

    return user;
  } catch (error) {
    throw error;
  }
};
