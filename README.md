# **GPT-playlist-generator**
Harness the power of GPT to generate personalized Spotify playlists with a simple text prompt. Curate your musical experience effortlessly!
This TypeScript project provides an easy-to-use command line tool that generates a playlist on Spotify based on a user's prompt. Powered by OpenAI's GPT.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#Setup)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
## Features

- 🎵 Generates a playlist based on user prompts
- 🧠 Utilizes OpenAI's GPT for AI-powered playlist creation
- 🔍 Supports different search methods for finding songs on Spotify
- 📝 Automatically creates a title and description for the generated playlist
- 🚀 Supports dry-run mode for testing without creating a playlist on Spotify
- 🐛 Verbose logs for debugging

## Prerequisites
- [Node.js](https://nodejs.org/) (>= 14.x)
- [npm](https://www.npmjs.com/) (>= 6.x)
- [OpenAI API key](https://beta.openai.com/signup/)
- [Spotify Developer account](https://developer.spotify.com/dashboard/applications)

## Setup
### **Required Tokens for Playlist Generation**

In order to generate a playlist on your account, the following tokens are needed:

- `OPENAI_TOKEN`
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`

Please obtain these tokens and insert them into a `.env` file in the project root, using the following format:

```
OPENAI_TOKEN=your_openai_token
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

Don't forget to replace `your_openai_token`, `your_spotify_client_id`, and `your_spotify_client_secret` with your actual token values.
#### Generating **OPENAI_TOKEN**

1. Go to [OpenAI](https://beta.openai.com/signup/) and create an account or log in.
2. Navigate to the [API keys](https://beta.openai.com/account/api-keys) page.
3. Click the "Create an API key" button and copy the key generated.

#### Generating **SPOTIFY_CLIENT_ID** and **SPOTIFY_CLIENT_SECRET**

1. Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and log in with your Spotify account or create a new one.
2. Click on the "Create an App" button.
3. Fill in the required information for your new app and click "Create".
4. You will be redirected to your app's overview page. Here, you'll find your `SPOTIFY_CLIENT_ID` (Client ID) and `SPOTIFY_CLIENT_SECRET` (Client Secret).
5. set the redirect url to `http://localhost:<redirect_port>}/callback` where "<redirect_port>" is the same as specified in ``generator.config.json``

## Usage
Run: ``npm run playlist <Your Prompt>`` with the following optional flags

| Option                        | Description                                                                     | Default  |
|-------------------------------|---------------------------------------------------------------------------------|----------|
| \`-st, --searchType\`           | Method used to search for songs on Spotify                                      |          |
| \`-t, --temperature\`           | Adjusts output randomness for diverse, creative responses                       | 0.5      |
| \`-mt, --maxTokens\`            | Maximum amount of tokens for the response                                       | 850      |
| \`-dg, --debugGpt\`             | Display verbose GPT related logging for debugging                               |          |
| \`-ds, --debugSpotify\`         | Display verbose Spotify related logging for debugging                           |          |
| \`--dryRun\`                    | Query GPT without creating a playlist                                           |          |

## Troubleshooting

If you encounter any issues or errors, try the following steps:

1. Make sure you have the correct tokens and credentials set up in your \`.env\` file.
2. Use the \`--debugGpt\` and \`--debugSpotify\` options to see verbose logs for better understanding of the issue.
3. Make sure your Node.js and npm versions meet the minimum requirements mentioned in the [Prerequisites](#prerequisites) section.
