import { validateActivateUser } from '../validateActivateUser';

describe('validateActivateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true with unchanged errors object on valid data', async () => {
    const data = {
      id: 'xxx',
      code: '000-000'
    };

    const errors = {};
    const actual = validateActivateUser(data, errors);

    expect(actual).toBeTruthy();
    expect(errors).toMatchObject({});
  });

  it('should return false with updated errors object when id not supplied', async () => {
    const data = {
      code: '000-000'
    };

    const errors = {};
    const actual = validateActivateUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ id: ['You_have_not_supplied_an_id'] });
  });

  it('should return false with updated errors object when code not supplied', async () => {
    const data = {
      id: 'xxx'
    };

    const errors = {};
    const actual = validateActivateUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ code: ['You_have_not_supplied_a_code'] });
  });

  it('should return false with updated errors object when invalid code supplied', async () => {
    const data = {
      id: 'xxx',
      code: 'xxx'
    };

    const errors = {};
    const actual = validateActivateUser(data, errors);

    expect(actual).toBeFalsy();
    expect(errors).toMatchObject({ code: ['You_have_supplied_an_invalid_code'] });
  });
});
