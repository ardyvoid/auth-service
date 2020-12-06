import { authedUser } from '../authedUser';

jest.mock('../../../utils/secure');

describe('authedUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call database client to load user with id from context user', async () => {
    const id = 1;
    const expected = {
      id,
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

    const context = { db, user: expected };
  
    const actual = await authedUser({}, {}, context, {});

    expect(authUserFindUnique).toHaveBeenCalledWith({ where: { id } });
    expect(actual).toMatchObject(expected);
  });

  it('should error when user object not in context object', async () => {
    try {
      const context = {};
      const actual = await authedUser({}, {}, context, {});

      expect(actual).toBe({});
    } catch (error) {
      expect(error.message).toBe('Not authenticated');
    }
  });
});
