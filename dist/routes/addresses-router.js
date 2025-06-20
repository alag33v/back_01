"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRouter = void 0;
const express_1 = require("express");
exports.addressesRouter = (0, express_1.Router)();
const addresses = [
    { id: 1, title: "address 1" },
    { id: 2, title: "address 2" },
    { id: 3, title: "address 3" },
];
exports.addressesRouter.get("/", (req, res) => {
    res.send(addresses);
});
exports.addressesRouter.get("/:id", (req, res) => {
    const addressId = parseInt(req.params.id);
    const address = addresses.find((address) => address.id === addressId);
    if (!address) {
        res.status(404).send("Address not found");
        return;
    }
    res.send(address);
});
