import { findUser } from '../findUser';

jest.mock('../../../utils/secure');

describe('findUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call database client to load user with id when context user present', async () => {
    const expected = {
      id: 1,
      username: 'xxx',
      email: 'xxx',
      role: 'USER',
      active: true,
      createdAt: 'xxx'
    };

    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockReturnValue(expected);

    const db = {
      authUser: { findUnique: authUserFindUnique },
    };

    const id = 1;
    const user = { id };
    const context = { db, user };
  
    const actual = await findUser({}, { id }, context, {});

    expect(authUserFindUnique).toHaveBeenCalledWith({ where: { id } });
    expect(actual).toMatchObject(expected);
  });

  it('should error when user object not in context object', async () => {
    try {
      const id = 1;
      const context = {};
      const actual = await findUser({}, { id }, context, {});

      expect(actual).toBe({});
    } catch (error) {
      expect(error.message).toBe('Not authenticated');
    }
  });
});
