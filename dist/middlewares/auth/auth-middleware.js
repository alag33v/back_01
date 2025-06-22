"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    const auth = req.headers["authorization"];
    console.log("auth", auth);
    if (!auth) {
        res.sendStatus(401);
        return;
    }
    const [type, token] = auth.split(" ");
    if (type !== "Basic") {
        res.sendStatus(401);
        return;
    }
    const decodedToken = Buffer.from(token, "base64").toString("utf-8");
    const [login, password] = decodedToken.split(":");
    if (login !== "admin" || password !== "qwerty") {
        res.sendStatus(401);
        return;
    }
    next();
};
exports.authMiddleware = authMiddleware;
