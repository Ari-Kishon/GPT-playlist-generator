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
const { spotify_username, gpt_model, redirect_port } = readUserConfig();

const program = new Command();

program
    .command('generate-playlist') // Needs better naming for flags (ask gpt?)
    .argument('prompt')
    .option('-st, --searchType [searchType]', 'Method used to search for songs on spotify')
    .option(
        '-t, --temperature [temperature]',
        'Adjusts output randomness: higher values produce diverse, creative responses',
        (v) => parseFloat(v),
        0.5
    )
    .option('-mt, --maxTokens [maxTokens]', 'Maximum amount of tokens for the response', (v) => parseInt(v), 850)
    .option('-dg, --debugGpt [debugGpt]', 'Display verbose GPT related logging for debugging')
    .option('-ds, --debugSpotify [debugSpotify]', 'Display verbose Spotify related logging for debugging')
    .option('--dryRun [dryRun]', 'Query GPT without creating a playlist')
    .action(async (prompt, { searchType, temperature, maxTokens: max_tokens, debugGpt, debugSpotify, dryRun }) => {
        const { getAccessToken, createPlaylist, updatePlaylist, getUserAuth, getSong } = await import('./spotify');
        const { playlist } = await import('./commands/playlist/playlist');

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
                .join('\n')}`,
            'FgMagenta'
        );
        const code = await getUserAuth(redirect_port);
        printLog(debugSpotify, `Received user code:\n${code}`, 'FgGreen');
        const { access_token } = await getAccessToken(code, redirect_port);
        printLog(debugSpotify, `Received access_token:\n${access_token}`, 'FgGreen');
        const tracks = [];
        for (const { song, artist } of songs) {
            const track = await getSong({ song, artist, searchType, token: access_token });
            if (track) tracks.push(track);
        }
        printLog(
            debugSpotify,
            `Found songs:\n${tracks
                .map(({ artists, name }, index) => `${index + 1}. ${artists.map(({ name }) => name)} - ${name}`)
                .join('\n')}`,
            'FgGreen'
        );
        if (!dryRun) {
            const {
                data: { id: playlistId },
            } = await createPlaylist({ user: spotify_username, name: title, description, token: access_token });
            printLog(debugSpotify, `Created playlist\n${playlistId}`, 'FgGreen');
            await updatePlaylist({
                playlistId: playlistId,
                songUris: tracks.map(({ uri }) => uri),
                token: access_token,
            });
        }
        printLog(true, `Done :)`);
    });

program.parseAsync().catch(setFailureExitCode);
