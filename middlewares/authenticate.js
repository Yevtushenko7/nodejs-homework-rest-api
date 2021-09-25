const jwt = require('jsonwebtoken');
const { Unauthorized } = require("http-errors");
const { User } = require('../model');



const authenticate = async (req, _, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== 'Bearer') {
      throw new Unauthorized()
    };
    const { SECRET_KEY } = process.env;
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (error) {
    throw new Unauthorized('Not authorized');
  }
};

module.exports = authenticate;