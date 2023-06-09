
![CI](https://img.shields.io/github/actions/workflow/status/Ari-Kishon/GPT-playlist-generator/.github/workflows/build.yml?logo=github&style=for-the-badge)
# GPT-playlist-generator
![GitHub last commit](https://img.shields.io/github/last-commit/Ari-Kishon/GPT-playlist-generator?style=for-the-badge)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/Ari-Kishon/GPT-playlist-generator?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/Ari-Kishon/GPT-playlist-generator?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/Ari-Kishon/GPT-playlist-generator?style=for-the-badge)

---

Harness the power of GPT to generate personalized Spotify playlists with a simple text prompt. Curate your musical experience effortlessly!
This TypeScript project provides an easy-to-use command line tool that generates a playlist on Spotify based on a user's prompt. Powered by OpenAI's GPT.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [Search types](#search-types)
- [Examples](#examples)
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
### Generating **OPENAI_TOKEN**

1. Go to [OpenAI](https://beta.openai.com/signup/) and create an account or log in.
2. Navigate to the [API keys](https://beta.openai.com/account/api-keys) page.
3. Click the "Create new secret key" button and copy the key generated.

### Generating **SPOTIFY_CLIENT_ID** and **SPOTIFY_CLIENT_SECRET**

1. Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and log in with your Spotify account or create a new one.
2. Click on the "Create App" button.
3. Set the redirect url to `http://localhost:<redirect_port>}/callback` where "<redirect_port>" is the same as specified in ``generator.config.json``
4. Fill in the required information for your new app and click "Save".
5. You will be redirected to your app's overview page. Here, you can find your `SPOTIFY_CLIENT_ID` (Client ID) and `SPOTIFY_CLIENT_SECRET` (Client Secret).

## Configuration

To begin using the generator you will need to create a `generator.config.json` file in the project root. This file allows you to set your Spotify username, choose the GPT model, and specify a redirect port for authentication.

Here's an example `generator.config.json` file:

<pre>
{
  "spotify_username": "your_spotify_username",
  "gpt_model": "gpt_model_name",
  "redirect_port": your_redirect_port
}
</pre>

### Configuration Options

- `spotify_username` (string): Set your Spotify username (required for playlist generation).
- `gpt_model` (string): Choose the GPT model you want to use (e.g., "gpt-3", "gpt-3.5-turbo", "gpt-4").
- `redirect_port` (integer): Specify the port for the OAuth2 redirect during Spotify authentication. Ensure this matches the redirect URL specified in your Spotify Developer Dashboard.

Replace `your_spotify_username`, `gpt_model_name`, and `your_redirect_port` with your actual values.
## Usage
Run: ``npm run playlist <Your Prompt>`` with the following optional flags

| Option                        | Description                                                                     | Type  | Default 
|-------------------------------|---------------------------------------------------------------------------------|----------|-------|
| \`-t, --temperature\`           | Adjusts output randomness for diverse, creative responses                       | number [0-1] | 850 |
| \`-mt, --maxTokens\`            | Maximum amount of tokens for the response                                       | number [integer] | 0.5 | 
| \`-dg, --debugGpt\`             | Display verbose GPT related logging for debugging                               | boolean | false |
| \`-ds, --debugSpotify\`         | Display verbose Spotify related logging for debugging                           | boolean | false |
| \`--dryRun\`                    | Query GPT without creating a playlist                                           | boolean | false |
| \`-st, --searchType\`           | Method used to search for songs on Spotify                                      | 'safe' | |

## Search types
### Default 
search for `${artist} ${songName}` and return the first result
### Safe Search

Attempt to match a song on Spotify by trying various combinations of the song and artist names, ensuring that it can find a match even if the initial query doesn't yield the desired result.

Define an array of three different search queries:

- `${song} ${artist}`: Combines the song and artist names.
- `${artist} ${song}`: Reverses the order of song and artist names.
- `${artist}`: Uses only the artist name.

For each query in the array, Check if there's a match between the expected artist and any of the actual artists on the track. If so return the track.
If no match is found, ignore the track.

## Examples
\* Please note that the speed and quality of the generated playlist varies between different models of GPT.  
   For the best results it is recommended to use gpt-4 if possible.

| Prompt                                                   | Model  | Temperature 
|----------------------------------------------------------|--------|-------|
|[Japanese city pop songs that are easy for begginers](https://open.spotify.com/playlist/1cd8Y62C6HPEsuAPKWLtbj?si=9e0118441cc4444a)|gpt-4| 0.5 |
|[25 Songs by the big 4 of thrash metal](https://open.spotify.com/playlist/25yhBXNW2HKXcHwSd6Y0Ec?si=4e7cc14ca70540a2)|gpt-4| 0.5 |
|[An ecclectic mix of Death Grips and Kero Kero Bontio](https://open.spotify.com/playlist/2kSDawBKp0EIdRP2rsyDar?si=8c3e699418a84f19)|gpt-4| 0.5 |
|[Songs about funny dogs and sad presidents](https://open.spotify.com/playlist/6GoIM4zaYpmfWrY9XW584L?si=4ad9304e5dad4b80)|gpt-4| 0.5 |

## Troubleshooting

If you encounter any issues or errors, try the following steps:

1. Make sure you have the correct tokens and credentials set up in your \`.env\` file.
2. Use the \`--debugGpt\` and \`--debugSpotify\` options to see verbose logs for better understanding of the issue.
3. Make sure your Node.js and npm versions meet the minimum requirements mentioned in the [Prerequisites](#prerequisites) section.

![GitHub issues](https://img.shields.io/github/issues/Ari-Kishon/GPT-playlist-generator?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Ari-Kishon/GPT-playlist-generator?style=for-the-badge)


## Contributors 
![GitHub contributors](https://img.shields.io/github/contributors/Ari-Kishon/GPT-playlist-generator?style=for-the-badge)  
![GitHub top language](https://img.shields.io/github/languages/top/Ari-Kishon/GPT-playlist-generator?style=for-the-badge)
![GitHub Repo size](https://img.shields.io/github/repo-size/Ari-Kishon/GPT-playlist-generator?style=for-the-badge)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Ari-Kishon/GPT-playlist-generator?style=for-the-badge)
