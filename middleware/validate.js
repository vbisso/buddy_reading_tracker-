const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  // Pass a custom error to the centralized error handler
  const error = new Error("Validation failed");
  error.statusCode = 422;
  error.details = errors.array().map((err) => ({
    field: err.param,
    message: err.msg,
  }));

  next(error);
};

module.exports = validate;
