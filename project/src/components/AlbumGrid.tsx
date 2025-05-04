import React from 'react';
import type { Album } from '../types/spotify';
import { AlbumCard } from './AlbumCard';
import { Music } from 'lucide-react';

interface AlbumGridProps {
  albums: Album[];
  isLoading: boolean;
}

export function AlbumGrid({ albums, isLoading }: AlbumGridProps) {
  if (isLoading) {
    return (
      <div className="mt-8 flex justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  if (albums.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Music size={24} />
        <span>Albums</span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
}