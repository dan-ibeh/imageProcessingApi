import express, { Request, Response } from "express";
import { routes } from "./routes/index";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response): void => {
  res.send("image processor!");
});

app.use("/image", routes);

app.listen(port, (): void => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
