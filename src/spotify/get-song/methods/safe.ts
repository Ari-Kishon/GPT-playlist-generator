import { colorPrint, textColors } from '../../../helpers';
import { search } from '../../endpoints';
import { Song } from '../../type';
import type { SearchParams } from '../types';

export const safeSearch = async ({ song, artist, token }: SearchParams): Promise<Song | undefined> => {
    for (const query of [`${song} ${artist}`, `${artist} ${song}`, `${artist}`]) {
        const expectedArtist = artist.toLowerCase().trim();
        if (query) {
            const {
                data: {
                    tracks: { items: results },
                },
            } = await search({ searchParams: { query }, token });
            const actualArtists = results[0]?.artists.map((a: any) => a.name.toLowerCase().trim());
            if (actualArtists?.find((a: any) => a.includes(expectedArtist) || expectedArtist.includes(a))) {
                return results[0];
            } else {
                colorPrint(
                    'FgWhite',
                    `Couldn't find artist match for "${query}"\n${textColors['FgGreen']}Expected: "${expectedArtist}" ${
                        textColors['FgRed']
                    }Found: "${JSON.stringify(actualArtists)}"\n`
                );
            }
        }
    }
    colorPrint('FgRed', `[!] couldn't find songs by "${artist}"\n`);
};
