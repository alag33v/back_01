import { body } from "express-validator";

const nameValidator = body("name")
  .isString()
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage("Incorrect name");
const descriptionValidator = body("description")
  .isString()
  .isLength({ min: 1, max: 500 })
  .withMessage("Incorrect description");
const websiteUrlValidator = body("websiteUrl")
  .isString()
  .trim()
  .isLength({ min: 1, max: 100 })
  .matches(
    /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
  )
  .withMessage("Incorrect websiteUrl");

export const blogValidator = () => [
  nameValidator,
  descriptionValidator,
  websiteUrlValidator,
];
