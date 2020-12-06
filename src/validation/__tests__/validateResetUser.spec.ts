import { validateResetUser } from '../validateResetUser';

describe('validateResetUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true with unchanged errors object on valid data', async () => {
    const data = {
      email: 'xxxxx@xxx.xxx'
    };

    const errors = {};
    const actual = validateResetUser(data, errors);

    expect(actual).toBeTruthy();
    expect(errors).toMatchObject({});
  });

  it('should return false with updated errors object when email not supplied', async () => {
    const data = {};

    const errors = {};
    const actual = validateResetUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ email: ['You_have_not_supplied_an_email'] });
  });

  it('should return false with updated errors object when invalid email supplied', async () => {
    const data = {
      email: 'xxxxxxxx'
    };

    const errors = {};
    const actual = validateResetUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ email: ['You_have_supplied_an_invalid_email'] });
  });
});
