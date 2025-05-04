import React, { useState, KeyboardEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    onSearch(searchInput);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search for an artist..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 pr-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-white/50 transition-all duration-300"
          disabled={isLoading}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="absolute right-1 p-2 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Search"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Search size={20} />
          )}
        </button>
      </div>
    </div>
  );
}