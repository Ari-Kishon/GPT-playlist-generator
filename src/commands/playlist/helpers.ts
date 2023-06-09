import { completePrompt } from '../../ai';
import { BaseCommandParams } from '../types';
import { TEMPERATURE_RANDOM } from '../../universal';
import { OpenAIApi } from 'openai';

const DELIMITER = '<->';
const LIST_FORMAT = `ArtistName ${DELIMITER} Song\nArtistName ${DELIMITER} Song\nArtistName ${DELIMITER} Song\nArtistName ${DELIMITER} Song`;

interface GenerationParams {
    prompt: string;
    baseCommandParams: BaseCommandParams;
    openai: OpenAIApi;
}

export const generatePlaylist = async ({ prompt, baseCommandParams: { requestParams }, openai }: GenerationParams) =>
    (
        await completePrompt({
            openai,
            requestOptions: {
                ...requestParams,
                messages: [
                    {
                        content: `Your answers must only consist of the name of the artist and song in the following format:\n${LIST_FORMAT}`,
                        role: 'system',
                    },
                    {
                        content: `You must not name any songs that don't exist.`,
                        role: 'system',
                    },
                    // {
                    //     content: `You must create a list NO MATTER WHAT`,
                    //     role: 'system',
                    // },
                    {
                        content: `Only list songs that are available on Spotify`,
                        role: 'system',
                    },
                    {
                        content: `Never put a number before a list entry, like this:\n1.ArtistName ${DELIMITER} Song`,
                        role: 'system',
                    },
                    {
                        content: `You must not name the same song more than once.`,
                        role: 'system',
                    },
                    {
                        content: `Only list the amount of songs specified. If not specified list 15.`,
                        role: 'system',
                    },
                    {
                        content: `Create a playlist according to the following specifications:\n${prompt}`,
                        role: 'user',
                    },
                ],
            },
        })
    ).replace(new RegExp(DELIMITER, 'g'), '-');

export const generateTitle = ({ prompt: songList, baseCommandParams: { requestParams }, openai }: GenerationParams) =>
    completePrompt({
        openai,
        requestOptions: {
            ...requestParams,
            temperature: TEMPERATURE_RANDOM,
            messages: [
                {
                    content: songList,
                    role: 'assistant',
                },
                {
                    content: 'Your answer must just be a name, no quotation marks.',
                    role: 'system',
                },
                {
                    content: 'Avoid cliche answers',
                    role: 'system',
                },
                {
                    content: 'Name this playlist.',
                    role: 'user',
                },
            ],
        },
    });

export const generateDescription = ({
    prompt: songList,
    baseCommandParams: { requestParams },
    openai,
}: GenerationParams) =>
    completePrompt({
        openai,
        requestOptions: {
            ...requestParams,
            temperature: TEMPERATURE_RANDOM,
            messages: [
                {
                    content: songList,
                    role: 'assistant',
                },
                {
                    content: 'Your answer must be under 40 words.',
                    role: 'system',
                },
                // {
                //     content: 'Use colorful language.',
                //     role: 'system',
                // },
                {
                    content:
                        'You must not start your answer with a cliche like: "This playlist..." or " Immerse yourself..."',
                    role: 'system',
                },
                {
                    content: 'Describe this playlist.',
                    role: 'user',
                },
            ],
        },
    });
