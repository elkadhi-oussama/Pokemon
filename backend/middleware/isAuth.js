const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send({ errors: [{ msg: "Not Authorized" }] });
    }

    const decoded = jwt.verify(token, process.env.SecretOrKey);
    // {
    // _id:""
    // }
    if (!decoded) {
      return res.status(401).send({ errors: [{ msg: "Not Authorized" }] });
    }
    const findUser = await User.findById(decoded._id);
    if (!findUser) {
      return res.status(401).send({ errors: [{ msg: "Not Authorized" }] });
    }
    req.user = findUser;
    next();
  } catch (error) {
    return res.status(401).send({ errors: [{ msg: "Not Authorized" }] });
  }
};
module.exports = isAuth;