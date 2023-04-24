import querystring from 'querystring';
import axios from 'axios';
import { colorPrint } from '../helpers';

interface ISearch {
    searchParams: { query: string; type?: string[]; market?: string };
    token: string;
}
export const search = async ({
    searchParams: { query, type = ['track', 'artist', 'album'], market = 'US' },
    token,
}: ISearch) =>
    axios.get(`https://api.spotify.com/v1/search?${querystring.stringify({ query, type: type.join(','), market })}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

// Consider Fallback if song by artist isnt found (get song by same name?)
export const getSong = async (song: string, artist: string, token: string) => {
    const lowerCaseArtist = artist.toLowerCase().trim();
    for (const query of [`${song} ${artist}`, `${artist} ${song}`, `${artist}`]) {
        if (query.trim()) {
            const {
                data: {
                    tracks: { items: results },
                },
            } = await search({ searchParams: { query }, token });
            const actualArtists = results[0]?.artists.map((a: any) => a.name.toLowerCase().trim());
            if (actualArtists?.find((a: any) => a.includes(lowerCaseArtist) || lowerCaseArtist.includes(a))) {
                return results[0];
            } else {
                printWarning({ expectedArtist: lowerCaseArtist, actualArtist: actualArtists, query });
            }
        }
    }
    console.log(colorPrint('FgRed', `[!] Search failed for songs by "${artist}"\n`));
};

interface IPrintWarning {
    query: string;
    actualArtist: string;
    expectedArtist: string;
}
const printWarning = ({ expectedArtist, query, actualArtist }: IPrintWarning) => {
    console.log(
        colorPrint(
            'FgRed',
            `Couldn't find artist match for "${query}"\nExpected: "${expectedArtist}"\nFound: "${JSON.stringify(
                actualArtist
            )}"\n`
        )
    );
};
