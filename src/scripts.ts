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
    .option('-ck, --consumerKey [consumerKey]', 'consumer key token')
    .option('-cs, --consumerSecret [consumerSecret]', 'consumer secret token')
    .option('-ak, --accessKey [accessKey]', 'access key token')
    .option('-as, --accessSecret [accessSecret]', 'access secret token')
    .option('-ok, --openaiToken [openaiToken]', 'openAI token')
    .action(async ({ consumerKey, consumerSecret, accessKey, accessSecret, openaiToken }) => {
        const envFileContent: string[] = [];
        envFileContent.push(`CONSUMER_KEY=${consumerKey}`);
        envFileContent.push(`CONSUMER_SECRET=${consumerSecret}`);
        envFileContent.push(`ACCESS_KEY=${accessKey}`);
        envFileContent.push(`ACCESS_SECRET=${accessSecret}`);
        envFileContent.push(`OPENAI_TOKEN=${openaiToken}`);
        fs.writeFileSync('.env', envFileContent.join('\n'));
    });

program.parseAsync().catch(setFailureExitCode);
