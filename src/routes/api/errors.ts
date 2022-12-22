import { NextFunction, Request, Response } from "express";

const errors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const height: number = parseInt(req.query.height as unknown as string);
  const width: number = parseInt(req.query.width as unknown as string);
  const filename = req.query.filename as unknown as string;
  if (isNaN(width)) {
    res.status(400).send({ error: "Invalid input for width" });
    return;
  }
  if (isNaN(height)) {
    res.status(400).send({ error: "Invalid input for height" });
    return;
  }
  next();
};

export default errors;
