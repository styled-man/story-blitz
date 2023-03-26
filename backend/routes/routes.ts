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
    const keywords: string = req.query.keywords as string
    const article = await getArticles(keywords)
    const data = await getContent(article!)
    return res.status(200).send({articleName: article, data})
})

router.post("/generate", async (req: Request, res: Response): Promise<Response> => {
    console.log("Posting to the route")
    const wikiData: WikipediaData[] = req.body.wikiData
    console.log("WIKI DATA", wikiData)
    try {
        const result = await generateData(wikiData)
        return res.status(200).send(result)
    } catch (e) {
        return res.status(500).send(e)
    }
})
