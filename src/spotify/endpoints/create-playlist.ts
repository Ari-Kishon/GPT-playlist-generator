import axios from 'axios';

interface ICreatePlaylist {
    user: string;
    name: string;
    description: string;
    token: string;
}
export const createPlaylist = async ({ user, name, description, token }: ICreatePlaylist) =>
    axios
        .post(
            `https://api.spotify.com/v1/users/${user}/playlists`,
            {
                name,
                public: false,
                description,
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
