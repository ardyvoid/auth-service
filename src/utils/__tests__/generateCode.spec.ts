import { generateCode } from '../generateCode';

describe('generateCode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create random codes in 000-000 format', async () => {
    const codeRegex = new RegExp('^([0-9]{3}-[0-9]{3})$');
    const codes: string[] = [];
    let code: string;
    let index: number;

    code = generateCode();
    expect(code).toMatch(codeRegex);
    codes.push(code);

    code = generateCode();
    index = codes.indexOf(code);
    expect(code).toMatch(codeRegex);
    expect(index).toBe(-1);
    codes.push(code);

    code = generateCode();
    index = codes.indexOf(code);
    expect(code).toMatch(codeRegex);
    expect(index).toBe(-1);
    codes.push(code);

    code = generateCode();
    index = codes.indexOf(code);
    expect(code).toMatch(codeRegex);
    expect(index).toBe(-1);
    codes.push(code);

    code = generateCode();
    index = codes.indexOf(code);
    expect(code).toMatch(codeRegex);
    expect(index).toBe(-1);
    codes.push(code);
  });
});
