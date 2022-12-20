import express, { Request, Response } from "express";
import sharp from "sharp";
import fs from "fs";

const routes = express.Router();
const inputDir =
  "C:/Users/Daniel Ibeh/OneDrive/Documents/Projects/Udacity Full Stack JavaScript Nanodegree/imageProcessingApi/imageProcessingApiDirs/input/";
const outputDir =
  "C:/Users/Daniel Ibeh/OneDrive/Documents/Projects/Udacity Full Stack JavaScript Nanodegree/imageProcessingApi/imageProcessingApiDirs/output/";

const convert = async (
  filename: string,
  height: number,
  width: number
): Promise<void> => {
  await sharp(inputDir + `${filename}.jpg`)
    .resize(width, height)
    .toFile(outputDir + `${filename}_thumb.jpg`);
};

const runConvert = async (
  res: Response,
  filename: string,
  height: number,
  width: number
): Promise<void> => {
  await convert(filename, height, width);
  res.sendFile(outputDir + `${filename}_thumb.jpg`);
};

routes.get("/", async (req: Request, res: Response): Promise<void> => {
  const height: number = Number(req.query.height as unknown);
  const width: number = Number(req.query.width as unknown);
  const filename = req.query.filename as unknown as string;

  try {
    // check if file exists
    if (fs.existsSync(outputDir + `${filename}_thumb.jpg`)) {
      // if file exists, display file
      res.sendFile(outputDir + `${filename}_thumb.jpg`);
    } else {
      // if file doesn't exists, create and display file
      runConvert(res, filename, height, width);
    }
  } catch (err) {
    console.error(err);
  }
});

export { routes, convert };
