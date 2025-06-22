import { db } from "../db/db";
import { Post } from "../types";
import { BlogRepository } from "./blog-repository";

export class PostRepository {
  static getAllPosts() {
    return db.posts;
  }

  static getPostById(id: string) {
    return db.posts.find((post) => post.id === id);
  }

  static createPost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
  ) {
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      shortDescription,
      content,
      blogId,
      blogName,
    };

    db.posts.push(newPost);
    return newPost;
  }

  static updatePost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ) {
    const post = this.getPostById(id);

    if (!post) {
      return false;
    }

    post.title = title;
    post.shortDescription = shortDescription;
    post.content = content;
    post.blogId = blogId;
    post.blogName = BlogRepository.getBlogById(blogId)?.name ?? "";

    return true;
  }

  static deletePost(id: string) {
    const post = this.getPostById(id);

    if (!post) {
      return false;
    }

    db.posts = db.posts.filter((post) => post.id !== id);
    return true;
  }
}
