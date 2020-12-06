import { secure } from '../secure';

describe('secure', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should extract object user property from context object when object', async () => {
    const expected = {
      id: 'xxx',
      username: 'xxx'
    };

    const context = { user: expected };
    const actual = secure(context);

    expect(actual).toMatchObject(expected);
  });

  it('should error when user object not in context object', async () => {
    try {
      const context = {};
      const actual = secure(context);

      expect(actual).toBe({});
    } catch (error) {
      expect(error.message).toBe('Not authenticated');
    }
  });
});
