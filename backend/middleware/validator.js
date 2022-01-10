const { check, validationResult } = require("express-validator");
// validation de register
exports.registerRules = () => [
  check("name", "name is required").notEmpty(),
  check("pseduo", "pseduo is required").notEmpty(),
  check("email", "email is required").notEmpty(),
  check("email", "check email again ").isEmail(),
  check("password", "password must be at least 6 character").isLength({
    min: 6,
    max: 20,
  }),
];
// validation de login
exports.loginRules = () => [
  check("email", "email is required").notEmpty(),
  check("email", "check email again ").isEmail(),
  check("password", "password must be at least 6 character").isLength({
    min: 6,
    max: 20,
  }),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array().map((el)=>({msg: el.msg})) });
  }
  next();
};
