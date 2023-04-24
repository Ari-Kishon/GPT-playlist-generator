import child_process from 'child_process';
import querystring from 'querystring';
import { colorPrint } from '../../helpers';
import express from 'express';

export const getUserAuth = async () => {
    const PORT = 54321;
    const clientID = process.env.SPOTIFY_CLIENT_ID;
    const params = querystring.stringify({
        response_type: 'code',
        client_id: clientID,
        scope: 'playlist-modify-private',
        redirect_uri: 'http://localhost:54321/callback',
    });
    const urlObj = new URL('https://accounts.spotify.com/authorize');
    const searchParams = new URLSearchParams(params);
    urlObj.search = searchParams.toString();
    const authUrl = encodeURI(urlObj.toString()).replace(new RegExp('%25', 'g'), '%');

    let code;
    return new Promise<string>((resolve, reject) => {
        const app = express();
        app.get('/callback', async (req, res) => {
            code = req.query.code as string;
            res.send('Authentication Complete! You can close this window.');
            resolve(code);
        });

        const server = app.listen(PORT, async () => {
            colorPrint('FgGreen', `Waiting for authorization from browser`);
        });
        const start = process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open';
        colorPrint('FgCyan', `Please visit the following URL to authorize your application:\n${authUrl}`);
        child_process.exec(`${start} "${authUrl}"`);
        setTimeout(() => {
            server.close();
            reject();
        }, 5_000);
    });
};
