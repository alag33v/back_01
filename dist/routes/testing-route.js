"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRoute = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
exports.testingRoute = (0, express_1.Router)();
exports.testingRoute.delete("/all-data", (req, res) => {
    db_1.db.blogs = [];
    db_1.db.posts = [];
    res.sendStatus(204);
});
