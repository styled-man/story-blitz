import { Configuration, OpenAIApi } from "openai";
import { WikipediaData } from "../interfaces/WikipediaData"
import { CONDITIONING_PROMPT } from "../config";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const assemblePrompt = (data: WikipediaData[]) => {
    console.log(data)
    return `${CONDITIONING_PROMPT}\n${data.map((category: WikipediaData) => "\n" + category.section + "\n" + category.data)}`
}

export const generateData = async (data: WikipediaData[]) => {
    const prompt = assemblePrompt(data)
    //console.log("PROMPT: ")
    //console.log(prompt)
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0,
        max_tokens: 1000,
    });

    return response
}