import { Request, Response, Router } from "express";

export const addressesRouter = Router();

const addresses = [
  { id: 1, title: "address 1" },
  { id: 2, title: "address 2" },
  { id: 3, title: "address 3" },
];

addressesRouter.get("/", (req: Request, res: Response) => {
  res.send(addresses);
});

addressesRouter.get("/:id", (req: Request, res: Response) => {
  const addressId = parseInt(req.params.id);
  const address = addresses.find((address) => address.id === addressId);

  if (!address) {
    res.status(404).send("Address not found");
    return;
  }

  res.send(address);
});
