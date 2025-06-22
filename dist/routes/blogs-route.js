"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRoute = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
const blog_validators_1 = require("../validators/blog-validators");
const blog_repository_1 = require("../repositories/blog-repository");
const input_validation_1 = require("../middlewares/inputValidation/input-validation");
exports.blogsRoute = (0, express_1.Router)();
exports.blogsRoute.get("/", (req, res) => {
    const blogs = blog_repository_1.BlogRepository.getAllBlogs();
    res.send(blogs);
});
exports.blogsRoute.get("/:id", (req, res) => {
    const blog = blog_repository_1.BlogRepository.getBlogById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    res.send(blog);
});
exports.blogsRoute.post("/", auth_middleware_1.authMiddleware, (0, blog_validators_1.blogValidator)(), input_validation_1.inputValidationMiddleware, (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const createdBlog = blog_repository_1.BlogRepository.createBlog(name, description, websiteUrl);
    res.status(201).send(createdBlog);
});
exports.blogsRoute.put("/:id", auth_middleware_1.authMiddleware, (0, blog_validators_1.blogValidator)(), input_validation_1.inputValidationMiddleware, (req, res) => {
    const blog = blog_repository_1.BlogRepository.getBlogById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    const { name, description, websiteUrl } = req.body;
    const isUpdated = blog_repository_1.BlogRepository.updateBlog(req.params.id, name, description, websiteUrl);
    if (!isUpdated) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
});
exports.blogsRoute.delete("/:id", auth_middleware_1.authMiddleware, (req, res) => {
    const isDeleted = blog_repository_1.BlogRepository.deleteBlog(req.params.id);
    if (!isDeleted) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
});
