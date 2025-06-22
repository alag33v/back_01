import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth/auth-middleware";
import { blogValidator } from "../validators/blog-validators";
import { BlogRepository } from "../repositories/blog-repository";

export const blogsRoute = Router();

blogsRoute.get("/", (req: Request, res: Response) => {
  const blogs = BlogRepository.getAllBlogs();
  res.send(blogs);
});

blogsRoute.get("/:id", (req: Request, res: Response) => {
  const blog = BlogRepository.getBlogById(req.params.id);

  if (!blog) {
    res.sendStatus(404);
    return;
  }

  res.send(blog);
});

blogsRoute.post(
  "/",
  authMiddleware,
  blogValidator(),
  (req: Request, res: Response) => {
    const { name, description, websiteUrl } = req.body;

    const createdBlog = BlogRepository.createBlog(
      name,
      description,
      websiteUrl
    );

    res.status(201).send(createdBlog);
  }
);

blogsRoute.put(
  "/:id",
  authMiddleware,
  blogValidator(),
  (req: Request, res: Response) => {
    const blog = BlogRepository.getBlogById(req.params.id);

    if (!blog) {
      res.sendStatus(404);
      return;
    }

    const { name, description, websiteUrl } = req.body;

    const isUpdated = BlogRepository.updateBlog(
      req.params.id,
      name,
      description,
      websiteUrl
    );

    if (!isUpdated) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(204);
  }
);

blogsRoute.delete("/:id", authMiddleware, (req: Request, res: Response) => {
  const isDeleted = BlogRepository.deleteBlog(req.params.id);

  if (!isDeleted) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
});
