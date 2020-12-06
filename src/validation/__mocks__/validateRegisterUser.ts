const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

export const validateRegisterUser = async (db: any, args: any, errors: any): Promise<boolean> => {
  let valid: boolean = true;

  const { username, email } = args;

  if (typeof username === 'undefined') {
    errors.username = ['You_have_not_supplied_an_username'];
    valid = false;
  }

  if (username) {
    if (username.length < 5) {
      errors.username = ['The_supplied_username_is_too_short'];
      valid = false;
    }

    if (username.length > 18) {
      errors.username = ['The_supplied_username_is_too_long'];
      valid = false;
    }

    const userUsername = await db.authUser.findUnique({ where: { username } });
    if (userUsername) {
      errors.username = ['The_supplied_username_has_already_been_taken'];
      valid = false;
    }
  }

  if (typeof email === 'undefined') {
    errors.email = ['You_have_not_supplied_an_email'];
    valid = false;
  }

  if (email) {
    if (!emailRegex.test(email)) {
      errors.email = ['You_have_supplied_an_invalid_email'];
      valid = false;
    }

    const userEmail = await db.authUser.findUnique({ where: { email } });
    if (userEmail) {
      errors.email = ['The_supplied_email_has_already_been_registered'];
      valid = false;
    }
  }

  return valid;
};
