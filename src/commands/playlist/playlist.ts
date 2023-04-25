import { getOpenAiApi, printLog } from '../../helpers';
import { BaseCommandParams } from '../types';
import { generateDescription, generatePlaylist, generateTitle } from './helpers';

export const playlist = async (prompt: string, { requestParams }: BaseCommandParams) => {
    const openai = getOpenAiApi();

    const playlist = await generatePlaylist({ prompt, baseCommandParams: { requestParams }, openai });
    const lines = playlist.split('\n').filter((line) => line);
    const unexpectedResults = lines.filter((line) => line.length > 80);
    const expectedResult = lines.filter((line) => line.length < 80).join('\n');
    printLog(
        unexpectedResults.length > 0,
        `Unexpected results from GPT:\n${unexpectedResults.join('\n')}`,
        'BgRed'
    );

    const title = await generateTitle({ prompt: expectedResult ?? '', baseCommandParams: { requestParams }, openai });
    const description = await generateDescription({
        prompt: expectedResult ?? '',
        baseCommandParams: { requestParams },
        openai,
    });

    return {
        songs: expectedResult.split('\n').map((line) => {
            const split = line.split('-');
            return {
                song: split[1]?.trim() ?? '',
                artist: split[0].trim(),
            };
        }),
        title,
        description,
    };
};
