"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepository = void 0;
const db_1 = require("../db/db");
class BlogRepository {
    static getAllBlogs() {
        return db_1.db.blogs;
    }
    static getBlogById(id) {
        return db_1.db.blogs.find((blog) => blog.id === id);
    }
    static createBlog(name, description, websiteUrl) {
        const newBlog = {
            id: Date.now().toString(),
            name,
            description,
            websiteUrl,
        };
        db_1.db.blogs.push(newBlog);
        return newBlog;
    }
    static updateBlog(id, name, description, websiteUrl) {
        const blog = this.getBlogById(id);
        if (!blog) {
            return false;
        }
        blog.name = name;
        blog.description = description;
        blog.websiteUrl = websiteUrl;
        return true;
    }
    static deleteBlog(id) {
        const blog = this.getBlogById(id);
        if (!blog) {
            return false;
        }
        db_1.db.blogs = db_1.db.blogs.filter((blog) => blog.id !== id);
        return true;
    }
}
exports.BlogRepository = BlogRepository;
