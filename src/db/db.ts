import { Blog, Post } from "../types";

export const db = {
  blogs: [
    {
      id: "1",
      name: "Blog 1",
      description: "Description 1",
      websiteUrl: "https://blog1.com",
    },
  ] as Blog[],
  posts: [
    {
      id: "1",
      title: "Post 1",
      shortDescription: "Short Description 1",
      content: "Content 1",
      blogId: "1",
    },
  ] as Post[],
};
