import { Request, Response, Router } from "express";

export const productsRouter = Router();

const products = [
  { id: 1, title: "cucumber" },
  { id: 2, title: "tomato" },
  { id: 3, title: "potato" },
  { id: 4, title: "onion" },
  { id: 5, title: "apple" },
  { id: 6, title: "banana" },
  { id: 7, title: "orange" },
  { id: 8, title: "pear" },
  { id: 9, title: "pineapple" },
  { id: 10, title: "strawberry" },
];

productsRouter.get("/", (req: Request, res: Response) => {
  const title = req.query.title as string;

  if (title) {
    res.send(products.filter((product) => product.title.includes(title)));
  } else {
    res.send(products);
  }
});

productsRouter.post("/", (req: Request, res: Response) => {
  const newProduct = {
    id: products.length + 1,
    title: req.body.title,
  };

  products.push(newProduct);

  res.status(201).send(newProduct);
});

productsRouter.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const title = req.body.title;
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    res.status(404).send("Product not found");
    return;
  }

  products[index] = {
    id,
    title,
  };

  res.send(products[index]);
});

productsRouter.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    res.status(404).send("Product not found");
    return;
  }

  products.splice(index, 1);

  res.sendStatus(204);
});
