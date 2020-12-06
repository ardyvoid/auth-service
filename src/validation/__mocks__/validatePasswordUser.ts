const codeRegex = /^([0-9]{3}-[0-9]{3})$/;
const lowercaseRegex = /[a-z]+/;
const uppercaseRegex = /[A-Z]+/;
const digitRegex = /[0-9]+/;
const specialRegex = /[!^*_.]+/;

export const validatePasswordUser = (args: any, errors: any): boolean => {
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

  if (typeof args.password === 'undefined') {
    errors.password = ['You_have_not_supplied_a_password'];
    valid = false;
  }

  if (args.password) {
    const passwordErrors: string[] = [];

    if (args.password.length < 8) {
      passwordErrors.push('The_supplied_password_is_too_short');
    }

    if (args.password.length > 16) {
      passwordErrors.push('The_supplied_password_is_too_long');
    }

    if (!lowercaseRegex.test(args.password)) {
      passwordErrors.push('The_supplied_password_must_contain_a_lowercase_letter');
    }

    if (!uppercaseRegex.test(args.password)) {
      passwordErrors.push('The_supplied_password_must_contain_an_uppercase_letter');
    }

    if (!digitRegex.test(args.password)) {
      passwordErrors.push('The_supplied_password_must_contain_a_digit');
    }

    if (!specialRegex.test(args.password)) {
      passwordErrors.push('The_supplied_password_must_contain_a_special_character');
    }

    if (passwordErrors.length) {
      errors.password = [ ...passwordErrors ];
      valid = false;
    }
  }

  return valid;
};
