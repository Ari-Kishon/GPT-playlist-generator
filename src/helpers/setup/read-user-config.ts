import fs from 'fs';
import path from 'path';
import type { UserConfig } from './types';

const CONFIG_FILE_NAME = 'generator.config.json';
const CWD = process.cwd();
const CONFIG_PATH = path.join(CWD, CONFIG_FILE_NAME);

const EXPECTED_CONFIG_KEYS: Array<keyof UserConfig> = ['spotify_username', 'gpt_model', 'redirect_port'];

export const readUserConfig = (): UserConfig => {
    let userConfigContent;
    let parsedConfig;
    try {
        userConfigContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
    } catch {
        throw new Error(`Couldn't find \`\`${CONFIG_FILE_NAME}\`\`\nIn current cwd: ${CWD}`);
    }
    try {
        parsedConfig = JSON.parse(userConfigContent);
    } catch (e) {
        throw new Error(`Could not parse config with the following error\n${e}`);
    }
    for (const key of EXPECTED_CONFIG_KEYS) {
        if (!parsedConfig[key]) {
            throw new Error(`\`\`${CONFIG_FILE_NAME}\`\` is missing the following key: "${key}"`);
        }
    }
    return parsedConfig;
};
