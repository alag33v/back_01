"use strict";
const addresses = [
    { id: 1, title: "address 1" },
    { id: 2, title: "address 2" },
    { id: 3, title: "address 3" },
];
app.get("/addresses", (req, res) => {
    res.send(addresses);
});
app.get("/addresses/:id", (req, res) => {
    const addressId = parseInt(req.params.id);
    const address = addresses.find((address) => address.id === addressId);
    if (!address) {
        res.status(404).send("Address not found");
        return;
    }
    res.send(address);
});
