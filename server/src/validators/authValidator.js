import { check } from "express-validator";

export function registerValidator() {
  return [
    check("first_name")
      .notEmpty()
      .withMessage("first name feild cannot be empty.")
      .isString()
      .withMessage("first name feild must be in type of string."),
    check("last_name")
      .notEmpty()
      .withMessage("last name feild cannot be empty.")
      .isString()
      .withMessage("last name feild must be in type of string."),
    check("email")
      .notEmpty()
      .withMessage("email feild cannot be empty.")
      .isEmail()
      .withMessage("email format is invalid."),
    check("password")
      .notEmpty()
      .withMessage("password field cannot be empty."),
  ];
}

export function loginValidator() {
  return [
    check("email")
      .notEmpty()
      .withMessage("email feild cannot be empty.")
      .isEmail()
      .withMessage("email format is invalid."),
    check("password")
      .notEmpty()
      .withMessage("password field cannot be empty."),
  ];
}
