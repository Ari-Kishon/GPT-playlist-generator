import { getOpenAiApi } from '../../helpers';
import { BaseCommandParams } from '../types';
import { generateDescription, generatePlaylist, generateTitle } from './helpers';

export const playlist = async (prompt: string, { requestParams }: BaseCommandParams) => {
    const openai = getOpenAiApi();
    const playlist = await generatePlaylist({ prompt, baseCommandParams: { requestParams }, openai });
    const title = await generateTitle({ prompt: playlist ?? '', baseCommandParams: { requestParams }, openai });
    const description = await generateDescription({
        prompt: playlist ?? '',
        baseCommandParams: { requestParams },
        openai,
    });

    return {
        songs: playlist
            .split('\n')
            .filter((line) => line)
            .map((line) => {
                const split = line.split('-');
                return {
                    song: split[1]?.trim() ?? '',
                    artist: split[0].trim(),
                };
            }),
        title: title,
        description: description,
    };
};
