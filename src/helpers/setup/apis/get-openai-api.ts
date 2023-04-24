import { Configuration, OpenAIApi } from 'openai';

export const getOpenAiApi = () => {
    const openaiToken = process.env['OPENAI_TOKEN'];
    if (!openaiToken) {
        throw new Error('openAI key  was not found');
    }
    return new OpenAIApi(
        new Configuration({
            organization: 'org-1uS68ddLJyWT1b7WPjpGVkNJ',
            apiKey: openaiToken,
        })
    );
};
