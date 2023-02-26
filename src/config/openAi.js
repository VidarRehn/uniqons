import { OpenAIApi, Configuration } from "openai"

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
})

export const openai = new OpenAIApi(configuration)
export const { apiKey } = openai.configuration
