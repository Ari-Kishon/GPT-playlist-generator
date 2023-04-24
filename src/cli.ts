/* eslint-disable no-console */
import { Command } from 'commander';
import { printLog, readEnvFile, readUserConfig } from './helpers';
const setFailureExitCode = (e: unknown) => {
    process.exitCode = 1;
    console.error(e);
};
process.on('uncaughtException', setFailureExitCode);
process.on('unhandledRejection', setFailureExitCode);

readEnvFile();
const { spotify_username, gpt_model } = readUserConfig();

const program = new Command();

program
    .command('generate-playlist')
    .argument('prompt')
    .option(
        '-e, --experimental [experimental]',
        'Try to always find correct songs (may results in smaller less accurate playlists than requested)'
    )
    .action(async (prompt, { experimental }) => {
        const { search, getAccessToken, createPlaylist, updatePlaylist, getUserAuth, getSong } = await import(
            './spotify'
        );
        const { playlist } = await import('./commands/playlist');
        printLog(`Generating playlist:\n${prompt}`);
        const { songs, title, description } = await playlist(prompt, {
            requestParams: {
                model: gpt_model,
                temperature: 0.5,
                max_tokens: 850,
            },
        });
        printLog(
            `Generated playlist info:\nTitle:${title}\nDescription:${description}\nSongs:\n${JSON.stringify(songs)}`
        );
        const code = await getUserAuth();
        printLog(`Received user code:\n${code}`);
        const { access_token } = await getAccessToken(code);
        printLog(`Received access_token:\n${access_token}`);
        const uris = [];
        for (const { song, artist } of songs) {
            if (song) {
                if (!experimental) {
                    const {
                        data: {
                            tracks: { items },
                        },
                    } = await search({ searchParams: { query: `${artist} ${song}` }, token: access_token ?? '' });
                    if (items[0]) {
                        uris.push(items[0].uri);
                    }
                } else {
                    const track = await getSong(song, artist, access_token);
                    if (track) {
                        uris.push(track.uri);
                    }
                }
            }
        }
        printLog(`Found song uris:\n${uris}`);
        const {
            data: { id: playlistId },
        } = await createPlaylist({ user: spotify_username, name: title, description, token: access_token });
        printLog(`Created playlist\n${playlistId}`);
        await updatePlaylist({ playlistId: playlistId, songUris: uris, token: access_token });
        printLog(`Done :)`);
    });

program.parseAsync().catch(setFailureExitCode);
