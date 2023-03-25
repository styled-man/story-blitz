import express, { Router, Request, Response } from "express";

export const router: Router = express.Router()

router.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    version: 0.1,
  });
});