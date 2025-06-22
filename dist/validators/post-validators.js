"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidator = void 0;
const express_validator_1 = require("express-validator");
const blog_repository_1 = require("../repositories/blog-repository");
const titleValidator = (0, express_validator_1.body)("title")
    .isString()
    .isLength({ min: 1, max: 30 })
    .withMessage("Incorrect title");
const shortDescriptionValidator = (0, express_validator_1.body)("shortDescription")
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage("Incorrect shortDescription");
const contentValidator = (0, express_validator_1.body)("content")
    .isString()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Incorrect content");
const blogIdValidator = (0, express_validator_1.body)("blogId").custom((value) => {
    const blog = blog_repository_1.BlogRepository.getBlogById(value);
    if (!blog) {
        throw new Error("Blog not found");
    }
    return true;
});
const postValidator = () => [
    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator,
];
exports.postValidator = postValidator;
