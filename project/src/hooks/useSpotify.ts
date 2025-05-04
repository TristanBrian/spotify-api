import { useState, useEffect, useCallback } from 'react';
import { getAccessToken, searchArtist, getArtistAlbums } from '../services/spotify';
import type { Artist, Album } from '../types/spotify';

export function useSpotify() {
  const [accessToken, setAccessToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);

  // Initialize Spotify access token
  useEffect(() => {
    const initializeToken = async () => {
      try {
        const token = await getAccessToken();
        setAccessToken(token);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize Spotify');
        console.error(err);
      }
    };

    initializeToken();
  }, []);

  // Handle artist search
  const searchForArtist = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError('Please enter an artist name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Ensure we have a fresh token before making the request
      const freshToken = await getAccessToken();
      setAccessToken(freshToken);

      const artistData = await searchArtist(query, freshToken);
      setArtist(artistData);
      
      // Fetch albums for the found artist using the same fresh token
      const albumsData = await getArtistAlbums(artistData.id, freshToken);
      setAlbums(albumsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    artist,
    albums,
    searchForArtist,
    isInitialized: !!accessToken,
  };
}