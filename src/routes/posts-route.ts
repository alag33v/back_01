import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth/auth-middleware";
import { PostRepository } from "../repositories/post-repository";
import { postValidator } from "../validators/post-validators";

export const postsRoute = Router();

postsRoute.get("/", authMiddleware, (req: Request, res: Response) => {
  const posts = PostRepository.getAllPosts();
  res.send(posts);
});

postsRoute.get("/:id", authMiddleware, (req: Request, res: Response) => {
  const post = PostRepository.getPostById(req.params.id);

  if (!post) {
    res.sendStatus(404);
    return;
  }

  res.send(post);
});

postsRoute.post(
  "/",
  authMiddleware,
  postValidator(),
  (req: Request, res: Response) => {
    const { title, shortDescription, content, blogId, blogName } = req.body;

    const createdPost = PostRepository.createPost(
      title,
      shortDescription,
      content,
      blogId,
      blogName
    );

    res.status(201).send(createdPost);
  }
);

postsRoute.put(
  "/:id",
  authMiddleware,
  postValidator(),
  (req: Request, res: Response) => {
    const post = PostRepository.getPostById(req.params.id);

    if (!post) {
      res.sendStatus(404);
      return;
    }

    const { title, shortDescription, content, blogId } = req.body;

    const isUpdated = PostRepository.updatePost(
      req.params.id,
      title,
      shortDescription,
      content,
      blogId
    );

    if (!isUpdated) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(204);
  }
);

postsRoute.delete("/:id", authMiddleware, (req: Request, res: Response) => {
  const isDeleted = PostRepository.deletePost(req.params.id);

  if (!isDeleted) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
});
