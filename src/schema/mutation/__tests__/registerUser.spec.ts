import { registerUser } from '../registerUser';

jest.mock('../../../utils/generateCode');
jest.mock('../../../validation/validateRegisterUser');

describe('registerUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call database client to create user with details and return id on success', async () => {
    const username = 'xxxxx';
    const email = 'xxxxx@xxxxx.xxx';
    const pin = '0000';
    const expected = {
      id: 1
    };

    const authUserFindUnique = jest.fn();
    const authUserCreate = jest.fn();
    authUserFindUnique.mockReturnValue(false);
    authUserCreate.mockReturnValue(expected);

    const db = {
      authUser: {
        create: authUserCreate,
        findUnique: authUserFindUnique
      },
    };

    const context = { db };

    const actual = await registerUser({}, { username, email, pin }, context);

    expect(authUserCreate).toHaveBeenCalledTimes(1);
    expect(actual).toMatchObject({ id: 1 });
  });

  it('should validate request and return error with details when invalid', async () => {
    const email = 'xxxxx.xxx';

    const authUserFindUnique = jest.fn();
    const authUserCreate = jest.fn();
    authUserFindUnique.mockReturnValue(false);
    authUserCreate.mockReturnValue(false);

    const db = {
      authUser: {
        create: authUserCreate,
        findUnique: authUserFindUnique
      },
    };

    const context = { db };

    try {
      const actual = await registerUser({}, { email }, context);

      expect(actual).toBe({});
    } catch (error) {
      expect(authUserCreate).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('Bad Request');
    }
  });
});
