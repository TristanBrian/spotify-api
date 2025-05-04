import React from 'react';
import type { Album } from '../types/spotify';
import { Disc, ExternalLink } from 'lucide-react';

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  return (
    <div className="album-card group relative overflow-hidden rounded-lg bg-black/30 backdrop-blur-sm transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg border border-white/10">
      <div className="aspect-square overflow-hidden">
        {album.images && album.images[0] ? (
          <img
            src={album.images[0].url}
            alt={album.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gray-800 flex items-center justify-center">
            <Disc size={50} className="text-white/50" />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-white line-clamp-2 min-h-[56px]">{album.name}</h3>
        
        <div className="mt-2 flex items-center text-white/70 text-sm">
          <span>Released: {new Date(album.release_date).toLocaleDateString()}</span>
        </div>
        
        <div className="mt-2 text-white/70 text-sm">
          <span>Tracks: {album.total_tracks}</span>
        </div>
        
        <a
          href={album.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-green-500 py-2 px-4 font-medium text-white transition-colors hover:bg-green-600"
        >
          <span>Open in Spotify</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}