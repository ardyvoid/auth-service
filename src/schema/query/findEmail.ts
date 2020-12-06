export const findEmail = async (parent: any, args: any, context: any, info: any) => {
  try {
    const { email } = args;
    const user = await context.db.authUser.findUnique({ where: { email } });
    const exists = user ? true : false;

    return { exists };
  } catch (error) {
    throw error;
  }
};
