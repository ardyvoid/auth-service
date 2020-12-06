import { validateRegisterUser } from '../validateRegisterUser';

describe('validateRegisterUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true with unchanged errors object on valid data', async () => {
    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockReturnValue(false);

    const db = {
      authUser: {
        findUnique: authUserFindUnique
      },
    };

    const data = {
      username: 'xxxxxxxx',
      email: 'xxxxx@xxx.xxx',
      pin: '0000'
    };

    const errors = {};
    const actual = await validateRegisterUser(db, data, errors);

    expect(actual).toEqual(true);
    expect(errors).toMatchObject({});
  });

  it('should return false with updated errors object when username not supplied', async () => {
    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockReturnValue(false);

    const db = {
      authUser: {
        findUnique: authUserFindUnique
      },
    };

    const data = {
      email: 'xxxxx@xxx.xxx',
      pin: '0000'
    };

    const errors = {};
    const actual = await validateRegisterUser(db, data, errors);

    expect(actual).toEqual(false);
    expect(errors).toMatchObject({ username: ['You_have_not_supplied_an_username'] });
  });

  it('should return false with updated errors object when short username supplied', async () => {
    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockReturnValue(false);

    const db = {
      authUser: {
        findUnique: authUserFindUnique
      },
    };

    const data = {
      username: 'xxx',
      email: 'xxxxx@xxx.xxx',
      pin: '0000'
    };

    const errors = {};
    const actual = await validateRegisterUser(db, data, errors);

    expect(actual).toEqual(false);
    expect(errors).toMatchObject({ username: ['The_supplied_username_is_too_short'] });
  });

  it('should return false with updated errors object when long username supplied', async () => {
    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockReturnValue(false);

    const db = {
      authUser: {
        findUnique: authUserFindUnique
      },
    };

    const data = {
      username: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      email: 'xxxxx@xxx.xxx',
      pin: '0000'
    };

    const errors = {};
    const actual = await validateRegisterUser(db, data, errors);

    expect(actual).toEqual(false);
    expect(errors).toMatchObject({ username: ['The_supplied_username_is_too_long'] });
  });

  it('should return false with updated errors object when existing username supplied', async () => {
    const expected = {
      id: 'xxx',
      username: 'xxx',
      email: 'xxxxx@xxx.xxx',
      roles: ['USER'],
      status: true,
      createdAt: 'xxx',
      updatedAt: 'xxx'
    };

    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockReturnValueOnce(expected).mockReturnValueOnce(false);

    const db = {
      authUser: {
        findUnique: authUserFindUnique
      },
    };

    const data = {
      username: 'xxxxxxxx',
      email: 'xxxxx@xxx.xxx',
      pin: '0000'
    };

    const errors = {};
    const actual = await validateRegisterUser(db, data, errors);

    expect(actual).toEqual(false);
    expect(errors).toMatchObject({ username: ['The_supplied_username_has_already_been_taken'] });
  });

  it('should return false with updated errors object when email not supplied', async () => {
    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockReturnValue(false);

    const db = {
      authUser: {
        findUnique: authUserFindUnique
      },
    };

    const data = {
      username: 'xxxxxxxx',
      pin: '0000'
    };

    const errors = {};
    const actual = await validateRegisterUser(db, data, errors);

    expect(actual).toEqual(false);
    expect(errors).toMatchObject({ email: ['You_have_not_supplied_an_email'] });
  });

  it('should return false with updated errors object when invalid email supplied', async () => {
    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockReturnValue(false);

    const db = {
      authUser: {
        findUnique: authUserFindUnique
      },
    };

    const data = {
      username: 'xxxxxxxx',
      email: 'xxxxxxxx',
      pin: '0000'
    };

    const errors = {};
    const actual = await validateRegisterUser(db, data, errors);

    expect(actual).toEqual(false);
    expect(errors).toMatchObject({ email: ['You_have_supplied_an_invalid_email'] });
  });

  it('should return false with updated errors object when existing email supplied', async () => {
    const expected = {
      id: 'xxx',
      username: 'xxx',
      email: 'xxxxx@xxx.xxx',
      roles: ['USER'],
      status: true,
      createdAt: 'xxx',
      updatedAt: 'xxx'
    };

    const authUserFindUnique = jest.fn();
    authUserFindUnique.mockReturnValueOnce(false).mockReturnValueOnce(expected);

    const db = {
      authUser: {
        findUnique: authUserFindUnique
      },
    };

    const data = {
      username: 'xxxxxxxx',
      email: 'xxxxx@xxx.xxx',
      pin: '0000'
    };

    const errors = {};
    const actual = await validateRegisterUser(db, data, errors);

    expect(actual).toEqual(false);
    expect(errors).toMatchObject({ email: ['The_supplied_email_has_already_been_registered'] });
  });
});
