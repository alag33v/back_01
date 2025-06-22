"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const db_1 = require("../db/db");
const blog_repository_1 = require("./blog-repository");
class PostRepository {
    static getAllPosts() {
        return db_1.db.posts;
    }
    static getPostById(id) {
        return db_1.db.posts.find((post) => post.id === id);
    }
    static createPost(title, shortDescription, content, blogId, blogName) {
        const newPost = {
            id: Date.now().toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName,
        };
        db_1.db.posts.push(newPost);
        return newPost;
    }
    static updatePost(id, title, shortDescription, content, blogId) {
        var _a, _b;
        const post = this.getPostById(id);
        if (!post) {
            return false;
        }
        post.title = title;
        post.shortDescription = shortDescription;
        post.content = content;
        post.blogId = blogId;
        post.blogName = (_b = (_a = blog_repository_1.BlogRepository.getBlogById(blogId)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "";
        return true;
    }
    static deletePost(id) {
        const post = this.getPostById(id);
        if (!post) {
            return false;
        }
        db_1.db.posts = db_1.db.posts.filter((post) => post.id !== id);
        return true;
    }
}
exports.PostRepository = PostRepository;
