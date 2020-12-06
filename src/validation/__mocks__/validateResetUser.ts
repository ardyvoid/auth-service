const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

export const validateResetUser = (args: any, errors: any): boolean => {
  let valid: boolean = true;

  if (typeof args.email === 'undefined') {
    errors.email = ['You_have_not_supplied_an_email'];
    valid = false;
  }

  if (args.email) {
    if (!emailRegex.test(args.email)) {
      errors.email = ['You_have_supplied_an_invalid_email'];
      valid = false;
    }
  }

  return valid;
};
