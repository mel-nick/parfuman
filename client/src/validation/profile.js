export const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength6 = minLength(6)

export const profile = (data) => {
  const errors = {};
  const { newpassword, prevpassword } = data

  if (!newpassword) {
    errors.newpassword = 'Password is required'
  } else if (newpassword.length < 6) {
    console.log(newpassword);
    errors.newpassword = 'Password must have 6 chars'
  }

  if (!prevpassword) {
    errors.prevpassword = 'Password is required'
  } else if (prevpassword.length < 6) {
    errors.prevpassword = 'Password must have 6 chars'
  }

  return errors
};

