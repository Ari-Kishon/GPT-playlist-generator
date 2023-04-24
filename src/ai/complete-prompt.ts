import { CreateChatCompletionRequest, OpenAIApi } from 'openai';

interface ICompletePrompt {
    openai: OpenAIApi;
    requestOptions: CreateChatCompletionRequest;
}

export const completePrompt = async ({ openai, requestOptions }: ICompletePrompt) => {
    const { data } = await openai.createChatCompletion(requestOptions).catch((e) => {
        throw new Error(e.message);
    });
    return new Promise<string>((resolve, reject) => {
        if (data.choices) {
            if (!data.choices[0]) {
                reject();
            }
            resolve(data.choices.map(({ message }) => message?.content.trim())[0]!);
        } else {
            reject();
        }
    });
};
