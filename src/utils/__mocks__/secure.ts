export const secure = (context: any) => {
  try {
    const { user } = context;

    if (!user) {
      throw new Error('Not authenticated');
    }

    return user;
  } catch (error) {
    throw error;
  }
};
