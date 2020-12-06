import { resetUser } from '../resetUser';

jest.mock('../../../utils/generateCode');
jest.mock('../../../validation/validateResetUser');

describe('resetUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call database client to load user with email and return id on success', async () => {
    const email = 'xxxxx@xxxxx.xxx';
    const expected = {
      id: 1,
      username: 'xxxxx',
      email,
      roles: 'USER',
      active: true,
      createdAt: 'xxx'
    };

    const authUserUpdate = jest.fn();
    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockReturnValue(expected);

    const db = {
      authUser: {
        findUnique: authUserFindUnique,
        update: authUserUpdate
      },
    };

    const context = { db };

    const actual = await resetUser({}, { email }, context);

    expect(authUserFindUnique).toHaveBeenCalledWith({ where: { email } });
    expect(authUserUpdate).toHaveBeenCalledTimes(1);
    expect(actual).toHaveProperty('id');
  });

  it('should validate request and return error with details when invalid', async () => {
    const email = 'xxxxx.xxx';

    const authUserUpdate = jest.fn();
    const authUserFindUnique = jest.fn();

    const db = {
      authUser: {
        findUnique: authUserFindUnique,
        update: authUserUpdate
      },
    };

    const context = { db };

    try {
      const actual = await resetUser({}, { email }, context);

      expect(actual).toBe({});
    } catch (error) {
      expect(authUserFindUnique).toHaveBeenCalledTimes(0);
      expect(authUserUpdate).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('Bad Request');
    }
  });

  it('should call database client to load user with email and return invalid id when no user found', async () => {
    const email = 'xxxxx@xxxxx.xxx';

    const authUserUpdate = jest.fn();
    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockReturnValue(false);

    const db = {
      authUser: {
        findUnique: authUserFindUnique,
        update: authUserUpdate
      },
    };

    const context = { db };

    const actual = await resetUser({}, { email }, context);

    expect(authUserFindUnique).toHaveBeenCalledWith({ where: { email } });
    expect(authUserUpdate).toHaveBeenCalledTimes(0);
    expect(actual).toHaveProperty('id');
  });
});
