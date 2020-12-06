import { validatePasswordUser } from '../validatePasswordUser';

describe('validatePasswordUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true with unchanged errors object on valid data', async () => {
    const data = {
      id: 'xxx',
      code: '000-000',
      password: 'Some.Pa55'
    };

    const errors = {};
    const actual = validatePasswordUser(data, errors);

    expect(actual).toBeTruthy();
    expect(errors).toMatchObject({});
  });

  it('should return false with updated errors object when id not supplied', async () => {
    const data = {
      code: '000-000',
      password: 'Some.Pa55'
    };

    const errors = {};
    const actual = validatePasswordUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ id: ['You_have_not_supplied_an_id'] });
  });

  it('should return false with updated errors object when code not supplied', async () => {
    const data = {
      id: 'xxx',
      password: 'Some.Pa55'
    };

    const errors = {};
    const actual = validatePasswordUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ code: ['You_have_not_supplied_a_code'] });
  });

  it('should return false with updated errors object when invalid code supplied', async () => {
    const data = {
      id: 'xxx',
      code: 'xxx',
      password: 'Some.Pa55'
    };

    const errors = {};
    const actual = validatePasswordUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ code: ['You_have_supplied_an_invalid_code'] });
  });

  it('should return false with updated errors object when password not supplied', async () => {
    const data = {
      id: 'xxx',
      code: '000-000'
    };

    const errors = {};
    const actual = validatePasswordUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ password: ['You_have_not_supplied_a_password'] });
  });

  it('should return false with updated errors object when password too short', async () => {
    const data = {
      id: 'xxx',
      code: '000-000',
      password: 'So.55'
    };

    const errors = {};
    const actual = validatePasswordUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ password: ['The_supplied_password_is_too_short'] });
  });

  it('should return false with updated errors object when password too long', async () => {
    const data = {
      id: 'xxx',
      code: '000-000',
      password: 'So.55So.55So.55So.55So.55So.55So.55So.55'
    };

    const errors = {};
    const actual = validatePasswordUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ password: ['The_supplied_password_is_too_long'] });
  });

  it('should return false with updated errors object when password missing lowercase letter', async () => {
    const data = {
      id: 'xxx',
      code: '000-000',
      password: 'SOME.PA55'
    };

    const errors = {};
    const actual = validatePasswordUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ password: ['The_supplied_password_must_contain_a_lowercase_letter'] });
  });

  it('should return false with updated errors object when password missing uppercase letter', async () => {
    const data = {
      id: 'xxx',
      code: '000-000',
      password: 'some.pa55'
    };

    const errors = {};
    const actual = validatePasswordUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ password: ['The_supplied_password_must_contain_an_uppercase_letter'] });
  });

  it('should return false with updated errors object when password missing digit', async () => {
    const data = {
      id: 'xxx',
      code: '000-000',
      password: 'Some.Pass'
    };

    const errors = {};
    const actual = validatePasswordUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ password: ['The_supplied_password_must_contain_a_digit'] });
  });

  it('should return false with updated errors object when password missing special character', async () => {
    const data = {
      id: 'xxx',
      code: '000-000',
      password: 'SomePa55'
    };

    const errors = {};
    const actual = validatePasswordUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ password: ['The_supplied_password_must_contain_a_special_character'] });
  });
});
