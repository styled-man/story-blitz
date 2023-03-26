import express, { Application, Request, Response } from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { router } from "./routes/routes"

dotenv.config({ path: "../.env" })

const app: Application = express()
app.use(bodyParser.json())

app.use("/", router)

app.listen(process.env.PORT, (): void => {
  console.log(`Connected successfully on port ${process.env.PORT}`)
})