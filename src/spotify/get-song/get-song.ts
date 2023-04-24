import { printLog } from '../../helpers';
import { search } from '../endpoints';
import { Song } from '../type';
import { safeSearch } from './methods';
import type { SearchParams } from './types';

export const getSong = async (searchParams: SearchParams): Promise<Song | undefined> => {
    const searchType = searchParams.searchType ?? '';
    switch (searchType) {
        case '':
            return defaultSearch(searchParams);
        case 'safe':
            return safeSearch(searchParams);
        default:
            printLog(true, `Unknown search type "${searchType}", defaulting to regular search`, 'FgRed');
            return defaultSearch(searchParams);
    }
};

const defaultSearch = async ({ song, artist, token = '' }: SearchParams): Promise<Song> =>
    (await search({ searchParams: { query: `${artist} ${song}` }, token })).data?.tracks?.items[0];
