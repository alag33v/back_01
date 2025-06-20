import express, { Request, Response } from "express";
import { productsRouter } from "./routes/products-router";
import { addressesRouter } from "./routes/addresses-router";
import { videosRouter } from "./routes/videos-router";

export const app = express();

app.use(express.json());
app.use("/products", productsRouter);
app.use("/addresses", addressesRouter);
app.use("/videos", videosRouter);

app.delete("/testing/all-data", (req: Request, res: Response) => {
  videos.length = 0;

  res.sendStatus(204);
});
