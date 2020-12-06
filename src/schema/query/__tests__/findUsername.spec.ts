import { findUsername } from '../findUsername';

describe('findUsername', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call database client to find username and return true on success', async () => {
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

    const username = 'xxx';
    const context = { db };
  
    const actual = await findUsername({}, { username }, context, {});

    expect(authUserFindUnique).toHaveBeenCalledWith({ where: { username } });
    expect(actual).toMatchObject({ exists: true });
  });

  it('should call database client to find username and return false on failure', async () => {
    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockReturnValue(false);

    const db = {
      authUser: { findUnique: authUserFindUnique },
    };

    const username = 'xxx';
    const context = { db };
  
    const actual = await findUsername({}, { username }, context, {});

    expect(authUserFindUnique).toHaveBeenCalledWith({ where: { username } });
    expect(actual).toMatchObject({ exists: false });
  });

  it('should call database client to find email and return false on error', async () => {
    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockRejectedValue(new Error('Some error'));

    const db = {
      authUser: { findUnique: authUserFindUnique },
    };
    const username = 'xxx';
    const context = { db };

    try {
      const actual = await findUsername({}, { username }, context, {});

      expect(actual).toMatchObject({});
    } catch (error) {
      expect(authUserFindUnique).toHaveBeenCalledWith({ where: { username } });
      expect(error.message).toBe('Some error');
    }
  });
});
