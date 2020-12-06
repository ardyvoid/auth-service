import bcrypt from 'bcrypt';
import { loginUser } from '../loginUser';

describe('loginUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call database client to load user with username and return token on success', async () => {
    const username = 'testuser';
    const password = 'testpass';

    const expected = {
      id: 1,
      username,
      password: bcrypt.hashSync(password, 12),
      email: 'xxx',
      roles: 'USER',
      status: true,
      createdAt: 'xxx',
      updatedAt: 'xxx'
    };

    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockReturnValue(expected);

    const db = {
      authUser: { findUnique: authUserFindUnique },
    };

    const context = { db };
  
    const actual = await loginUser({}, { username, password }, context, {});

    expect(authUserFindUnique).toHaveBeenCalledWith({ where: { username, active: true } });
    expect(actual).toHaveProperty('token');
  });

  it('should call database client to load user with username and error when user not found', async () => {
    const username = 'testuser';
    const password = 'testpass';

    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockReturnValue(false);

    const db = {
      authUser: { findUnique: authUserFindUnique },
    };

    const context = { db };
  
    try {
      const actual = await loginUser({}, { username, password }, context, {});

      expect(actual).toBe({});
    } catch (error) {
      expect(authUserFindUnique).toHaveBeenCalledWith({ where: { username, active: true } });
      expect(error.message).toBe('Invalid credentials');
    }
  });

  it('should call database client to load user with username and error when password invalid', async () => {
    const username = 'testuser';
    const password = 'invalidpassword';

    const expected = {
      id: 1,
      username,
      password: bcrypt.hashSync('testpass', 12),
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

    const context = { db };
  
    try {
      const actual = await loginUser({}, { username, password }, context, {});

      expect(actual).toBe({});
    } catch (error) {
      expect(authUserFindUnique).toHaveBeenCalledWith({ where: { username, active: true } });
      expect(error.message).toBe('Invalid credentials');
    }
  });
});
