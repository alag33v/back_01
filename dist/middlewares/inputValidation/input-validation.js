"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const express_validator_1 = require("express-validator");
const authMiddleware = (req, res, next) => {
    const formattedErrors = (0, express_validator_1.validationResult)(req).formatWith((error) => ({
        message: error.msg,
        field: error.type === "field" ? error.path : "unknown",
    }));
    if (!formattedErrors.isEmpty()) {
        res.status(400).send({
            errorsMessages: formattedErrors.array({ onlyFirstError: true }),
        });
        return;
    }
    next();
};
exports.authMiddleware = authMiddleware;
