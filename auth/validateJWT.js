const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const message = {
  err: {
   code: 'Expired or invalid token',
  },
};

const secret = 'dev@marts_123456';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, secret);
    const { data } = decoded;
    const user = await Users.findOne({ where: { email: data } });

    if (!user) return res.status(401).json({ message: 'Expired or invalid token' });

    req.user = user.dataValues;
    next();
  } catch (err) {
    const { err: { code } } = message;
    return res.status(401).json({ message: code });
  }
};
