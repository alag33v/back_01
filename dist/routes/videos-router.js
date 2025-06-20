"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videos = exports.videosRouter = void 0;
const express_1 = require("express");
const types_1 = require("../types");
exports.videosRouter = (0, express_1.Router)();
exports.videos = [];
exports.videosRouter.get("/", (req, res) => {
    res.send(exports.videos);
});
exports.videosRouter.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const video = exports.videos.find((video) => video.id === id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    res.send(video);
});
exports.videosRouter.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = exports.videos.findIndex((video) => video.id === id);
    if (index === -1) {
        res.sendStatus(404);
        return;
    }
    exports.videos.splice(index, 1);
    res.sendStatus(204);
});
exports.videosRouter.post("/", (req, res) => {
    const errors = {
        errorsMessages: [],
    };
    let { title, author, availableResolutions } = req.body;
    if (!title || typeof title !== "string" || title.trim().length > 40) {
        errors.errorsMessages.push({
            message: "Invalid title",
            field: "title",
        });
    }
    if (!author || typeof author !== "string" || author.trim().length > 20) {
        errors.errorsMessages.push({
            message: "Invalid author",
            field: "author",
        });
    }
    if (Array.isArray(availableResolutions)) {
        availableResolutions.forEach((resolution) => {
            if (!Object.values(types_1.Resolution).includes(resolution)) {
                errors.errorsMessages.push({
                    message: "Invalid resolution",
                    field: "availableResolutions",
                });
                return;
            }
        });
    }
    else {
        availableResolutions = [];
    }
    if (errors.errorsMessages.length > 0) {
        res.status(400).send({ errors });
        return;
    }
    const newVideo = {
        id: new Date().getTime(),
        title,
        author,
        availableResolutions,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    };
    exports.videos.push(newVideo);
    res.status(201).send(newVideo);
});
exports.videosRouter.put("/:id", (req, res) => {
    const errors = {
        errorsMessages: [],
    };
    const id = Number(req.params.id);
    const index = exports.videos.findIndex((video) => video.id === id);
    if (index === -1) {
        res.sendStatus(404);
        return;
    }
    let { title: newTitle, author: newAuthor, availableResolutions: newAvailableResolutions, canBeDownloaded: newCanBeDownloaded, minAgeRestriction: newMinAgeRestriction, publicationDate: newPublicationDate, } = req.body;
    if (!newTitle ||
        typeof newTitle !== "string" ||
        newTitle.trim().length > 40) {
        errors.errorsMessages.push({
            message: "Invalid title",
            field: "title",
        });
    }
    if (!newAuthor ||
        typeof newAuthor !== "string" ||
        newAuthor.trim().length > 20) {
        errors.errorsMessages.push({
            message: "Invalid author",
            field: "author",
        });
    }
    if (Array.isArray(newAvailableResolutions)) {
        newAvailableResolutions.forEach((resolution) => {
            if (!Object.values(types_1.Resolution).includes(resolution)) {
                errors.errorsMessages.push({
                    message: "Invalid resolution",
                    field: "availableResolutions",
                });
                return;
            }
        });
    }
    else {
        newAvailableResolutions = [];
    }
    if (errors.errorsMessages.length > 0) {
        res.status(400).send({ errors });
        return;
    }
    // Create updated video with only provided fields
    const updates = {
        title: newTitle,
        author: newAuthor,
        availableResolutions: newAvailableResolutions,
        canBeDownloaded: newCanBeDownloaded,
        minAgeRestriction: newMinAgeRestriction,
        publicationDate: newPublicationDate,
    };
    const updatedVideo = Object.assign(Object.assign({}, exports.videos[index]), Object.fromEntries(Object.entries(updates).filter(([_, value]) => value !== undefined)));
    exports.videos[index] = updatedVideo;
    res.sendStatus(204);
});
