// frontend/src/utils/validatePassword.js

const validatePassword = (password) => {
  const minLength = 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]/.test(password);

  const isValid =
    password.length >= minLength &&
    hasLowercase &&
    hasUppercase &&
    hasNumber &&
    hasSpecialChar;

  return isValid;
};

export default validatePassword;
