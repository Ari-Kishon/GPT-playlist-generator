import querystring from 'querystring';
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in?: number;
    refresh_token?: string;
}
import axios from 'axios';
export const getAccessToken = async (code: string, redirect_port: number): Promise<TokenResponse> => {
    const params = querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: `http://localhost:${redirect_port}/callback`,
        client_id: clientId,
        client_secret: clientSecret,
    });
    const { data } = await axios.post('https://accounts.spotify.com/api/token', params);
    return data;
};
