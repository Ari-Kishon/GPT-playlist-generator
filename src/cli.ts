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
        '-t, --temperature [temperature]',
        'Adjusts output randomness: higher values produce diverse, creative responses',
        (v) => parseFloat(v),
        0.5
    )
    .option('-mt, --maxTokens [maxTokens]', 'Maximum amount of tokens for the response', (v) => parseInt(v), 850)
    .option('-dg, --debugGpt [debugGpt]', 'Display verbose GPT related logging for debugging')
    .option('-ds, --debugSpotify [debugSpotify]', 'Display verbose Spotify related logging for debugging')
    .option(
        '-e, --experimental [experimental]',
        'Try to always find correct songs (may results in smaller less accurate playlists than requested)'
    )
    .option('--dryRun [dryRun]', 'Query GPT without creating a playlist')
    .action(async (prompt, { experimental, temperature, maxTokens: max_tokens, debugGpt, debugSpotify, dryRun }) => {
        const { search, getAccessToken, createPlaylist, updatePlaylist, getUserAuth, getSong } = await import(
            './spotify'
        );
        const { playlist } = await import('./commands/playlist');
        printLog(debugGpt, `Generating "${prompt}"`, 'FgMagenta');
        const { songs, title, description } = await playlist(prompt, {
            requestParams: {
                model: gpt_model,
                temperature,
                max_tokens,
            },
        });

        printLog(
            debugGpt,
            `Generated playlist:\nTitle: ${title}\nDescription: ${description}\nSongs:\n${songs
                .map(({ artist, song }, index) => `${index + 1}. ${artist} - ${song}`)
                .join('\n')}}`,
            'FgMagenta'
        );

        const code = await getUserAuth();
        printLog(debugSpotify, `Received user code:\n${code}`, 'FgGreen');
        const { access_token } = await getAccessToken(code);
        printLog(debugSpotify, `Received access_token:\n${access_token}`, 'FgGreen');
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
        printLog(debugSpotify, `Found song uris:\n${uris}`, 'FgGreen');
        // TODO: Print which songs were actually found
        if (!dryRun) {
            const {
                data: { id: playlistId },
            } = await createPlaylist({ user: spotify_username, name: title, description, token: access_token });
            printLog(debugSpotify, `Created playlist\n${playlistId}`, 'FgGreen');
            await updatePlaylist({ playlistId: playlistId, songUris: uris, token: access_token });
        }
        printLog(true, `Done :)`);
    });

program.parseAsync().catch(setFailureExitCode);
