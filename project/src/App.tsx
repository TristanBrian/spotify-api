import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { ArtistInfo } from './components/ArtistInfo';
import { AlbumGrid } from './components/AlbumGrid';
import { ErrorMessage } from './components/ErrorMessage';
import { useSpotify } from './hooks/useSpotify';
import { Music, Heart } from 'lucide-react';

function App() {
  const { loading, error, artist, albums, searchForArtist, isInitialized } = useSpotify();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string) => {
    searchForArtist(query);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen px-4 py-10 md:py-16 bg-gradient-to-br from-black via-gray-900 to-indigo-900">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Music className="text-green-400 mr-2 animate-pulse" size={40} />
            <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Spotify<span className="text-green-400">Search</span>
            </h1>
          </div>
          <p className="text-white/70 max-w-lg mx-auto backdrop-blur-sm bg-white/5 rounded-full py-2 px-4">
            Find your favorite artists and discover their albums. Enter an artist name below to start exploring.
          </p>
        </header>

        {/* Search */}
        <SearchBar onSearch={handleSearch} isLoading={loading} />
        
        {/* Error Message */}
        <ErrorMessage message={error} />
        
        {/* Initialization Message */}
        {!isInitialized && !error && (
          <div className="mt-4 text-center text-white/70">
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
            Connecting to Spotify...
          </div>
        )}

        {/* No Search Results Yet */}
        {isInitialized && !hasSearched && !loading && !error && (
          <div className="mt-20 text-center text-white/50">
            <Music size={60} className="mx-auto mb-4 opacity-50 animate-bounce" />
            <p className="text-xl">Search for an artist to see their albums</p>
          </div>
        )}

        {/* Artist Info */}
        {artist && <ArtistInfo artist={artist} />}
        
        {/* Albums Grid */}
        <AlbumGrid albums={albums} isLoading={loading} />
        
        {/* Footer with Made with Love */}
        <footer className="mt-20 text-center space-y-2">
          <div className="flex items-center justify-center text-white/70 gap-2">
            Made with <Heart className="text-red-500 animate-pulse" size={16} /> by
            <a 
              href="https://tristan.dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-green-400 hover:text-green-300 transition-colors duration-300"
            >
              tristan.dev
            </a>
          </div>
          <p className="text-white/50 text-sm">
            Powered by Spotify API • {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;