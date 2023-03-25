import express, { Router, Request, Response } from "express";
import { getContent } from "../controllers/wikipedia"

export const router: Router = express.Router()

router.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    version: 0.1,
  });
});

router.get("/wikipedia", async (req: Request, res: Response): Promise<Response> => {
    const data = await getContent("Batman")
    return res.status(200).send(data) 
})