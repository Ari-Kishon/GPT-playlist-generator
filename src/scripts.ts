/* eslint-disable no-console */
import { Command } from 'commander';
import fs from 'fs';

const setFailureExitCode = (e: unknown) => {
    process.exitCode = 1;
    console.error(e);
};

process.on('uncaughtException', setFailureExitCode);
process.on('unhandledRejection', setFailureExitCode);

const program = new Command();

program
    .command('generate-env-file')
    .option('-ci, --consumerId [consumerId]', 'consumer id token')
    .option('-cs, --consumerSecret [consumerSecret]', 'consumer secret token')
    .option('-ok, --openaiToken [openaiToken]', 'openAI token')
    .action(async ({ consumerId, consumerSecret, openaiToken }) => {
        const envFileContent: string[] = [];
        envFileContent.push(`SPOTIFY_CLIENT_ID=${consumerId}`);
        envFileContent.push(`SPOTIFY_CLIENT_SECRET=${consumerSecret}`);
        envFileContent.push(`OPENAI_TOKEN=${openaiToken}`);
        fs.writeFileSync('.env', envFileContent.join('\n'));
    });

program.parseAsync().catch(setFailureExitCode);
