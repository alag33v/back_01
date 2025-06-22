"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRoute = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
const post_repository_1 = require("../repositories/post-repository");
const post_validators_1 = require("../validators/post-validators");
const input_validation_1 = require("../middlewares/inputValidation/input-validation");
const blog_repository_1 = require("../repositories/blog-repository");
exports.postsRoute = (0, express_1.Router)();
exports.postsRoute.get("/", (req, res) => {
    const posts = post_repository_1.PostRepository.getAllPosts();
    res.send(posts);
});
exports.postsRoute.get("/:id", (req, res) => {
    const post = post_repository_1.PostRepository.getPostById(req.params.id);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    res.send(post);
});
exports.postsRoute.post("/", auth_middleware_1.authMiddleware, (0, post_validators_1.postValidator)(), input_validation_1.inputValidationMiddleware, (req, res) => {
    const { title, shortDescription, content, blogId } = req.body;
    const blog = blog_repository_1.BlogRepository.getBlogById(blogId);
    const blogName = (blog === null || blog === void 0 ? void 0 : blog.name) || "";
    const createdPost = post_repository_1.PostRepository.createPost(title, shortDescription, content, blogId, blogName);
    res.status(201).send(createdPost);
});
exports.postsRoute.put("/:id", auth_middleware_1.authMiddleware, (0, post_validators_1.postValidator)(), input_validation_1.inputValidationMiddleware, (req, res) => {
    const post = post_repository_1.PostRepository.getPostById(req.params.id);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    const { title, shortDescription, content, blogId } = req.body;
    const isUpdated = post_repository_1.PostRepository.updatePost(req.params.id, title, shortDescription, content, blogId);
    if (!isUpdated) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
});
exports.postsRoute.delete("/:id", auth_middleware_1.authMiddleware, (req, res) => {
    const isDeleted = post_repository_1.PostRepository.deletePost(req.params.id);
    if (!isDeleted) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
});
