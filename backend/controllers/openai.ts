import { Configuration, OpenAIApi } from "openai";
import { WikipediaData } from "../interfaces/WikipediaData"
import { PRE_PROMPT, POST_PROMPT } from "../config";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const assemblePrompt = (data: WikipediaData[]) => {
    //console.log(data)
    return [{role: "user", content: `${PRE_PROMPT}\n${data.map((category: WikipediaData) => "\n" + category.section + "\n" + category.data)}`}]
}

export const generateData = async (data: WikipediaData[]) => {
    const firstPrompt: any = assemblePrompt(data)
    //const firstPrompt: any = [{role: "user", content: "What is the answer of 7+3?"}]
    //console.log("PROMPT: ")
    //console.log(prompt)
    console.log("FIRST_PROMPT", firstPrompt)
    const storyRaw = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: firstPrompt,
        max_tokens: 3000,
        temperature: 0.5,
        stream: false
    });
    const story = storyRaw.data.choices[0].message?.content

    const secondPrompt: any = [{role: "user", content: `${story}\n${POST_PROMPT}`}]
    console.log("SECOND PROMPT\n\n\n", secondPrompt)

    const questions_raw = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: secondPrompt,
        max_tokens: 3000,
        temperature: 0,
        stream: false
    });
    let questions = questions_raw.data.choices[0].message?.content
    console.log("\n\nQUESTIONS", questions)
    questions?.replace(/\n/g, "").replace(/\\/g, "")
    questions = JSON.parse(questions!)

    return {story, questions}
    //console.log("RESPONSE", story.data.choices[0].message, questions.data.choices[0].message)
}