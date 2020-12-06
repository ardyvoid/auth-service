export const findUsername = async (parent: any, args: any, context: any, info: any) => {
  try {
    const { username } = args;
    const user = await context.db.authUser.findUnique({ where: { username } });
    const exists = user ? true : false;

    return { exists };
  } catch (error) {
    throw error;
  }
};
