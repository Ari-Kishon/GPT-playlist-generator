import { CreateChatCompletionRequest } from 'openai';

export interface BaseCommandParams {
    requestParams: Omit<CreateChatCompletionRequest, 'messages'>;
    outputPath?: string;
}
