export interface Artist {
  id: string;
  name: string;
  images: SpotifyImage[];
  genres: string[];
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
}

export interface Album {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
  artists: {
    name: string;
  }[];
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}