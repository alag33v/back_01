import { Request, Response, Router } from "express";
import { Video, Resolution, RequestWithParams, ErrorResponse } from "../types";

export const videosRouter = Router();

export const videos: Video[] = [];

videosRouter.get("/", (req: Request, res: Response) => {
  res.send(videos);
});

videosRouter.get("/:id", (req: RequestWithParams, res: Response) => {
  const id = Number(req.params.id);
  const video = videos.find((video) => video.id === id);

  if (!video) {
    res.sendStatus(404);
    return;
  }

  res.send(video);
});

videosRouter.delete("/:id", (req: RequestWithParams, res: Response) => {
  const id = Number(req.params.id);

  const index = videos.findIndex((video) => video.id === id);

  if (index === -1) {
    res.sendStatus(404);
    return;
  }

  videos.splice(index, 1);
  res.sendStatus(204);
});

videosRouter.post("/", (req: Request, res: Response) => {
  const errors: ErrorResponse = {
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
      if (!Object.values(Resolution).includes(resolution)) {
        errors.errorsMessages.push({
          message: "Invalid resolution",
          field: "availableResolutions",
        });
        return;
      }
    });
  } else {
    availableResolutions = [];
  }

  if (errors.errorsMessages.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  const newVideo: Video = {
    id: new Date().getTime(),
    title,
    author,
    availableResolutions,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
  };

  videos.push(newVideo);
  res.status(201).send(newVideo);
});

videosRouter.put("/:id", (req: RequestWithParams, res: Response) => {
  const errors: ErrorResponse = {
    errorsMessages: [],
  };
  const id = Number(req.params.id);

  const index = videos.findIndex((video) => video.id === id);

  if (index === -1) {
    res.sendStatus(404);
    return;
  }

  let {
    title: newTitle,
    author: newAuthor,
    availableResolutions: newAvailableResolutions,
    canBeDownloaded: newCanBeDownloaded,
    minAgeRestriction: newMinAgeRestriction,
    publicationDate: newPublicationDate,
  } = req.body;

  if (
    !newTitle ||
    typeof newTitle !== "string" ||
    newTitle.trim().length > 40
  ) {
    errors.errorsMessages.push({
      message: "Invalid title",
      field: "title",
    });
  }

  if (
    !newAuthor ||
    typeof newAuthor !== "string" ||
    newAuthor.trim().length > 20
  ) {
    errors.errorsMessages.push({
      message: "Invalid author",
      field: "author",
    });
  }

  if (Array.isArray(newAvailableResolutions)) {
    newAvailableResolutions.forEach((resolution) => {
      if (!Object.values(Resolution).includes(resolution)) {
        errors.errorsMessages.push({
          message: "Invalid resolution",
          field: "availableResolutions",
        });
        return;
      }
    });
  } else {
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

  const updatedVideo: Video = {
    ...videos[index],
    ...Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    ),
  };

  videos[index] = updatedVideo;
  res.sendStatus(204);
});
