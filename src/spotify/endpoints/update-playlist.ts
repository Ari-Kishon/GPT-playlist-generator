import axios from 'axios';

interface IUpdatePlaylist {
    playlistId: string;
    songUris: string[];
    token: string;
}
export const updatePlaylist = async ({ playlistId, songUris, token }: IUpdatePlaylist) =>
    axios
        .put(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                uris: songUris,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .catch((e) => {
            throw new Error(e.message);
        });
