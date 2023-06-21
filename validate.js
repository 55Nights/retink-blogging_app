const { body, validationResult } = require("express-validator");

const onlyLettersAndWhiteSpaceRegex = /^[a-zA-Z\s]+$/;

const createBlogValidationRules = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isString()
    .withMessage("Content must be a string"),
  body("author")
    .notEmpty()
    .withMessage("Author is required")
    .isString()
    .withMessage("Author must be a string")
    .matches(onlyLettersAndWhiteSpaceRegex)
    .withMessage("Title can only contain letters (a-zA-Z)"),
];

const createCommentValidationRules = [
  body("content").notEmpty().withMessage("Content is required"),
  body("author").notEmpty().withMessage("Author is required"),
];

const createAuthorValidationRules = [
  body("fullname")
    .notEmpty()
    .withMessage("Full name is required")
    .isAlpha()
    .withMessage("Full name can only contain alphabets and spaces"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .withMessage("Invalid email address"),
];
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};
module.exports = {
  createBlogValidationRules,
  createCommentValidationRules,
  createAuthorValidationRules,
  validate,
};
