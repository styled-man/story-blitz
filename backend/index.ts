import express, { Application, Request, Response } from "express";
import dotenv from "dotenv"

dotenv.config({ path: "../.env" });

const app: Application = express();

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    version: 0.1,
  });
});

try {
  app.listen(process.env.PORT, (): void => {
    console.log(`Connected successfully on port ${process.env.PORT}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
