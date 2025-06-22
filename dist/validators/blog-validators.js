"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidator = void 0;
const express_validator_1 = require("express-validator");
const nameValidator = (0, express_validator_1.body)("name")
    .isString()
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage("Incorrect name");
const descriptionValidator = (0, express_validator_1.body)("description")
    .isString()
    .isLength({ min: 1, max: 500 })
    .withMessage("Incorrect description");
const websiteUrlValidator = (0, express_validator_1.body)("websiteUrl")
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage("Incorrect websiteUrl");
const blogValidator = () => [
    nameValidator,
    descriptionValidator,
    websiteUrlValidator,
];
exports.blogValidator = blogValidator;
