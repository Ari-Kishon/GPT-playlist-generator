import querystring from 'querystring';
import axios from 'axios';

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

