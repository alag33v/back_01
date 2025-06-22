import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const formattedErrors = validationResult(req).formatWith(
    (error: ValidationError) => ({
      message: error.msg,
      field: error.type === "field" ? error.path : "unknown",
    })
  );

  if (!formattedErrors.isEmpty()) {
    res.status(400).send({
      errorsMessages: formattedErrors.array({ onlyFirstError: true }),
    });
    return;
  }

  next();
};
