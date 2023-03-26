import express, { Router, Request, Response } from "express"
import { getContent, getArticles } from "../controllers/wikipedia"
import { WikipediaData } from "../interfaces/WikipediaData"
import { generateData } from "../controllers/openai"

export const router: Router = express.Router()

router.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        version: 0.1,
    })
})

router.get("/article", async (req: Request, res: Response): Promise<Response> => {
    const keywords: string = req.query.keywords as string
    const data = await getArticles(keywords)
    return res.status(200).send({ title: data })
})

router.get("/wikipedia", async (req: Request, res: Response): Promise<Response> => {
    const data = await getContent(req.body.articleId)
    return res.status(200).send(data)
})

router.get("/generate", async (req: Request, res: Response): Promise<Response> => {
    const wikiData: WikipediaData[] = req.body.wikiData
    try {
        const result = await generateData(wikiData)
        return res.status(200).send(result)
    } catch (e) {
        return res.status(500).send(e)
    }
})
