import React from 'react';
import type { Artist } from '../types/spotify';
import { Music } from 'lucide-react';

interface ArtistInfoProps {
  artist: Artist | null;
}

export function ArtistInfo({ artist }: ArtistInfoProps) {
  if (!artist) return null;

  return (
    <div className="mt-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-center gap-6 bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
        {artist.images && artist.images[0] ? (
          <img
            src={artist.images[0].url}
            alt={artist.name}
            className="w-40 h-40 object-cover rounded-full border-4 border-white/20"
          />
        ) : (
          <div className="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center border-4 border-white/20">
            <Music size={60} className="text-white/50" />
          </div>
        )}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-white mb-2">{artist.name}</h2>
          {artist.genres && artist.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
              {artist.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
          <div className="text-white/70">
            <p>{artist.followers?.total.toLocaleString()} followers</p>
          </div>
          <a
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors duration-300"
          >
            View on Spotify
          </a>
        </div>
      </div>
    </div>
  );
}