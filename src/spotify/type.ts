export interface Song {
    album: Album;
    artists: Artist[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: Object;
    external_urls: ExternalURLS;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    uri: string;
    type: 'track';
}

export interface Artist {
    external_urls: ExternalURLS;
    href: string;
    id: string;
    name: string;
    type: 'artist';
    uri: string;
}

export interface Album {
    album_group: string;
    album_type: string;
    artists: Artist[];
    external_urls: ExternalURLS;
    href: string;
    id: string;
    images: Object[];
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: 'album';
}

type ExternalURLS = Object;
