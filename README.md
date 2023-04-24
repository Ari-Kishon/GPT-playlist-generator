# **GPT-playlist-generator**
Harness the power of GPT to generate personalized Spotify playlists with a simple text prompt. Curate your musical experience effortlessly!

## **Setup**
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
### **Generating the required keys**

<details>
<summary>Click to expand</summary>

### Generating OPENAI_TOKEN

1. Go to [OpenAI](https://beta.openai.com/signup/) and create an account or log in.
2. Navigate to the [API keys](https://beta.openai.com/account/api-keys) page.
3. Click the "Create an API key" button and copy the key generated.

### Generating SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET

1. Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and log in with your Spotify account or create a new one.
2. Click on the "Create an App" button.
3. Fill in the required information for your new app and click "Create".
4. You will be redirected to your app's overview page. Here, you'll find your `SPOTIFY_CLIENT_ID` (Client ID) and `SPOTIFY_CLIENT_SECRET` (Client Secret).

</details>
