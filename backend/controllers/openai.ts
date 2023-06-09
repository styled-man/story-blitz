import { Configuration, OpenAIApi } from "openai"
import { WikipediaData } from "../interfaces/WikipediaData"
import { PRE_PROMPT, POST_PROMPT } from "../config"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export const generateData = async (data: WikipediaData[]) => {
    console.log("Generating data")
    const firstPrompt: any = [{role: "user", content: `${PRE_PROMPT}\n${data.map((category: WikipediaData) => "\n" + category.title + "\n" + category.content)}`}]
    const storyRaw = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: firstPrompt,
        max_tokens: 3000,
        temperature: 0.5,
        stream: false
    })
    const story = storyRaw.data.choices[0].message?.content
    console.log("generating prompt 2")

    const secondPrompt: any = [{role: "user", content: `${story}\n${POST_PROMPT}`}]
    //console.log("SECOND PROMPT\n\n\n", secondPrompt)

    const questions_raw = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: secondPrompt,
        max_tokens: 3000,
        temperature: 0,
        stream: false
    })
    let questions = questions_raw.data.choices[0].message!.content
    questions!.replace(/\n/g, "").replace(/\\/g, "")
    questions = JSON.parse(questions!)
    console.log("finished")

    return {story, questions}
}