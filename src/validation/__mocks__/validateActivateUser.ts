const codeRegex = /^([0-9]{3}-[0-9]{3})$/;

export const validateActivateUser = (args: any, errors: any): boolean => {
  let valid: boolean = true;

  if (typeof args.id === 'undefined') {
    errors.id = ['You_have_not_supplied_an_id'];
    valid = false;
  }

  if (typeof args.code === 'undefined') {
    errors.code = ['You_have_not_supplied_a_code'];
    valid = false;
  }

  if (args.code) {
    if (!codeRegex.test(args.code)) {
      errors.code = ['You_have_supplied_an_invalid_code'];
      valid = false;
    }
  }

  return valid;
};
