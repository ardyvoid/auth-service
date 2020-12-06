import bcrypt from 'bcrypt';
import { activateUser } from '../activateUser';

jest.mock('../../../utils/generateCode');
jest.mock('../../../validation/validateActivateUser');

describe('activateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call database client to load user with id and return id, code on success', async () => {
    const id = 1;
    const code = '123-789';
    const expected = {
      id,
      code: bcrypt.hashSync(code, 12)
    };

    const authUserUpdate = jest.fn();
    const authUserFindUnique = jest.fn();
    authUserUpdate.mockReturnValue(expected);
    authUserFindUnique.mockReturnValue(expected);

    const db = {
      authUser: {
        findUnique: authUserFindUnique,
        update: authUserUpdate
      },
    };

    const context = { db };

    const actual = await activateUser({}, { id, code }, context);

    expect(authUserFindUnique).toHaveBeenCalledWith({ where: { id } });
    expect(authUserUpdate).toHaveBeenCalledTimes(1);
    expect(actual).toHaveProperty('id');
    expect(actual).toHaveProperty('code');
  });

  it('should validate request and return error with details when invalid', async () => {
    const id = 1;

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
      const actual = await activateUser({}, { id }, context);

      expect(actual).toBe({});
    } catch (error) {
      expect(authUserFindUnique).toHaveBeenCalledTimes(0);
      expect(authUserUpdate).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('Bad Request');
    }
  });

  it('should call database client to load user with id and error on user not found', async () => {
    const id = 1;
    const code = '123-789';

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

    try {
      const actual = await activateUser({}, { id, code }, context);

      expect(actual).toBe({});
    } catch (error) {
      expect(authUserFindUnique).toHaveBeenCalledWith({ where: { id } });
      expect(authUserUpdate).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('Invalid credentials');
    }
  });

  it('should call database client to load user with id and error on invalid code', async () => {
    const id = 1;
    const code = '123-789';
    const expected = {
      id,
      code: bcrypt.hashSync('000-000', 12)
    };

    const authUserUpdate = jest.fn();
    const authUserFindUnique = jest.fn();
    authUserUpdate.mockReturnValue(expected);
    authUserFindUnique.mockReturnValue(expected);

    const db = {
      authUser: {
        findUnique: authUserFindUnique,
        update: authUserUpdate
      },
    };

    const context = { db };

    try {
      const actual = await activateUser({}, { id, code }, context);

      expect(actual).toBe({});
    } catch (error) {
      expect(authUserFindUnique).toHaveBeenCalledWith({ where: { id } });
      expect(authUserUpdate).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('Invalid credentials');
    }
  });
});
