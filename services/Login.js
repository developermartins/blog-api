const { Users } = require('../models');

const emptyEmail = {
  err: {
    status: 400,
    message: '"email" is not allowed to be empty',
  },
};

const emptyPassword = {
  err: {
    status: 400,
    message: '"password" is not allowed to be empty',
  },
};

const invalidFields = {
  err: {
    status: 400,
    message: 'Invalid fields',
  },
};

const requiredEmail = {
  err: {
    status: 400,
    message: '"email" is required',
  },
};

const passwordIsRequired = {
  err: {
    status: 400,
    message: '"password" is required',
  },
};

const validateUserEmail = (email) => {
  if (email === '') return emptyEmail;

  if (!email) return requiredEmail;
};

const validateUserPassword = (password) => {
  if (password === '') return emptyPassword;

  if (!password) return passwordIsRequired;
};

const userLogin = async (email, password) => {
  const validateEmail = validateUserEmail(email);
  const validatePassword = validateUserPassword(password);

  if (validateEmail) return validateEmail.err;
  if (validatePassword) return validatePassword.err;

  const userExists = await Users.findOne({ where: { email } });

  if (!userExists) return invalidFields.err;

  return userExists;
};

module.exports = {
  userLogin,
};
