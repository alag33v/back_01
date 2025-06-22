import { body } from "express-validator";
import { BlogRepository } from "../repositories/blog-repository";

const titleValidator = body("title")
  .isString()
  .isLength({ min: 1, max: 30 })
  .withMessage("Incorrect title");
const shortDescriptionValidator = body("shortDescription")
  .exists()
  .isString()
  .isLength({ min: 1, max: 100 })
  .withMessage("Incorrect shortDescription");
const contentValidator = body("content")
  .isString()
  .isLength({ min: 1, max: 1000 })
  .withMessage("Incorrect content");

const blogIdValidator = body("blogId").custom((value) => {
  const blog = BlogRepository.getBlogById(value);

  if (!blog) {
    throw new Error("Blog not found");
  }

  return true;
});

export const postValidator = () => [
  titleValidator,
  shortDescriptionValidator,
  contentValidator,
  blogIdValidator,
];
