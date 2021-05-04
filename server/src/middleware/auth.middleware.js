const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async (req, res, next) => {
  try {
    // * Get token from header
    const token = req.header('htoken');
    // * Check if !token
    if (!token) {
      res.status(403).send({ error: `Unauthorized.` });
    }

    // * Verify token
    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user = verify.user;
    next();
  } catch (error) {
    return res.status(403).send({ error: `Unauthorized.` });
  }
};
