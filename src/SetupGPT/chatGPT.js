import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();
console.log(response.data);