import { db } from "../db/db";
import { Blog } from "../types";

export class BlogRepository {
  static getAllBlogs() {
    return db.blogs;
  }

  static getBlogById(id: string) {
    return db.blogs.find((blog) => blog.id === id);
  }

  static createBlog(name: string, description: string, websiteUrl: string) {
    const newBlog: Blog = {
      id: Date.now().toString(),
      name,
      description,
      websiteUrl,
    };

    db.blogs.push(newBlog);
    return newBlog;
  }

  static updateBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ) {
    const blog = this.getBlogById(id);

    if (!blog) {
      return false;
    }

    blog.name = name;
    blog.description = description;
    blog.websiteUrl = websiteUrl;

    return true;
  }

  static deleteBlog(id: string) {
    const blog = this.getBlogById(id);

    if (!blog) {
      return false;
    }

    db.blogs = db.blogs.filter((blog) => blog.id !== id);
    return true;
  }
}
