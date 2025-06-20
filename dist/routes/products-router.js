"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
exports.productsRouter = (0, express_1.Router)();
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
exports.productsRouter.get("/", (req, res) => {
    const title = req.query.title;
    if (title) {
        res.send(products.filter((product) => product.title.includes(title)));
    }
    else {
        res.send(products);
    }
});
exports.productsRouter.post("/", (req, res) => {
    const newProduct = {
        id: products.length + 1,
        title: req.body.title,
    };
    products.push(newProduct);
    res.status(201).send(newProduct);
});
exports.productsRouter.put("/:id", (req, res) => {
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
exports.productsRouter.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
        res.status(404).send("Product not found");
        return;
    }
    products.splice(index, 1);
    res.sendStatus(204);
});
