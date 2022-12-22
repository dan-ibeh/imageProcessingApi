import express, { Request, Response } from "express";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const routes = express.Router();
const inputDir = path.join(__dirname, "../../imageProcessingApiDirs/input/");
const outputDir = path.join(__dirname, "../../imageProcessingApiDirs/output/");

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
  const height: number = parseInt(req.query.height as unknown as string);
  const width: number = parseInt(req.query.width as unknown as string);
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

export { routes, convert, outputDir };
