import app from "../index";
import supertest from "supertest";
import { convert, outputDir as output } from "../routes";
import fs from "fs";

describe("Test endpoint responses", (): void => {
  const request = supertest(app);
  it("gets the api endpint successfully", async (): Promise<void> => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});

describe("Test image conversion", (): void => {
  it("checks that file exists in output directory", async (): Promise<void> => {
    await convert("icelandwaterfall", 200, 200);
    const files = fs.readdirSync(output);
    expect(files).toContain("icelandwaterfall_thumb.jpg");
  });
});
