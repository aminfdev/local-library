import { validationResult } from "express-validator";

function validateReq(req, res) {
  const resault = validationResult(req);
  if (!resault.isEmpty()) {
    const errors = resault.array();
    const errorMessages = []
    errors.forEach((error) => errorMessages.push(error.msg));
    res.status(400).json({
      message: "The entered information is invalid.",
      errors: errorMessages,
    });
    return false;
  } else {
    return true;
  }
}

export function validate(req, res, next) {
  if (validateReq(req, res)) {
    return next();
  } else {
    return;
  }
}
