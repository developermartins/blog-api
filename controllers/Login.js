const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const Login = require('../services/Login');

const secret = 'dev@marts_123456';

const userLogin = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const verifyLogin = await Login.userLogin(email, password);

  if (verifyLogin.message) return next(verifyLogin);

  const user = email;

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return res.status(200).json({ token });
});

module.exports = {
  userLogin,
};
