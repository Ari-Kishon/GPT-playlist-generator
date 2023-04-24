import { CreateChatCompletionRequest, OpenAIApi } from 'openai';

interface ICompletePrompt {
    openai: OpenAIApi;
    requestOptions: CreateChatCompletionRequest;
}

export const completePrompt = async ({ openai, requestOptions }: ICompletePrompt) => {
    const { data } = await openai.createChatCompletion(requestOptions);
    return new Promise<(string | undefined)[]>((resolve, reject) => {
        if (data.choices) {
            if (!data.choices[0]) {
                reject();
            }
            resolve(data.choices.map(({ message }) => message?.content.trim()));
        } else {
            reject();
        }
    });
};
