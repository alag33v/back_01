import { Request, Response, Router } from "express";
import { db } from "../db/db";

export const testingRoute = Router();

testingRoute.delete("/all-data", (req: Request, res: Response) => {
  db.blogs = [];
  db.posts = [];
  res.sendStatus(204);
});
