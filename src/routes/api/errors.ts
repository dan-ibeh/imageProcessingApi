import { NextFunction, Request, Response } from "express";
import { inputDir } from "../index";
import fs from "fs";

const errors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const height: number = parseInt(req.query.height as unknown as string);
  const width: number = parseInt(req.query.width as unknown as string);
  const filename = req.query.filename as unknown as string;
  if (!fs.existsSync(inputDir + `${filename}.jpg`)) {
    res.status(400).send("File doesn't exist");
    return;
  }
  if (!filename && !width && !height) {
    res.status(400).send("Missing filename, height and width");
    return;
  }
  if (!filename) {
    res.status(400).send("Invalid input for filename ");
    return;
  }
  if (!width) {
    res.status(500).send("Invalid input for width");
    return;
  }
  if (!height) {
    res.status(500).send("Invalid input for height");
    return;
  }
  next();
};

export default errors;
