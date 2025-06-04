import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import SongListItem from '@/components/SongListItem';
import PlaylistCard from '@/components/PlaylistCard';
import MusicPlayerControls, { Song as PlayerSong } from '@/components/MusicPlayerControls';
import { Search as SearchIcon } from 'lucide-react';

const initialSongs = [
  { id: 's1', songTitle: 'Doraemon no Uta', artistName: 'Kumiko Osugi', albumArtUrl: 'https://placehold.co/100x100/60A5FA/FFFFFF?text=DN', duration: '3:00' },
  { id: 's2', songTitle: 'Yume wo Kanaete Doraemon', artistName: 'MAO', albumArtUrl: 'https://placehold.co/100x100/34D399/FFFFFF?text=YK', duration: '4:15' },
];
const initialPlaylists = [
  { id: 'p1', playlistName: 'Best of Doraemon', description: 'All time hits', imageUrl: 'https://placehold.co/300x300/F59E0B/FFFFFF?text=Doraemon+Hits', songCount: 10 },
];

const SearchPage = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{ songs: typeof initialSongs, playlists: typeof initialPlaylists }>({ songs: [], playlists: [] });

  const [currentSong, setCurrentSong] = useState<PlayerSong | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Simulate search results
    if (searchTerm.toLowerCase().includes('doraemon')) {
      setSearchResults({ songs: initialSongs, playlists: initialPlaylists });
    } else {
      setSearchResults({ songs: [], playlists: [] });
    }
  };

  const playSong = (id: string | number) => {
    const songToPlay = searchResults.songs.find(s => s.id === id);
    if (songToPlay) {
      setCurrentSong({
        title: songToPlay.songTitle,
        artist: songToPlay.artistName,
        albumArtUrl: songToPlay.albumArtUrl,
        duration: 180 // Placeholder
      });
      setIsPlaying(true);
      console.log('Playing song:', songToPlay.songTitle);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 flex-1 overflow-y-auto" style={{ paddingBottom: '90px' }}>
          <div className="flex gap-2 mb-6 items-center">
            <SearchIcon className="h-6 w-6 text-gray-500" />
            <Input
              type="search"
              placeholder="Search for songs, artists, playlists..."
              className="flex-grow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>

          <Tabs defaultValue="songs" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="songs">Songs ({searchResults.songs.length})</TabsTrigger>
              <TabsTrigger value="playlists">Playlists ({searchResults.playlists.length})</TabsTrigger>
              <TabsTrigger value="artists" disabled>Artists (0)</TabsTrigger> {/* Example disabled tab */}
            </TabsList>

            <TabsContent value="songs">
              <ScrollArea className="h-[calc(100vh-280px)]"> {/* Adjust height */}
                {searchResults.songs.length > 0 ? (
                  searchResults.songs.map(song => (
                    <SongListItem
                      key={song.id}
                      {...song}
                      onPlayClick={() => playSong(song.id)}
                      isPlaying={currentSong?.title === song.songTitle && isPlaying}
                      onMenuClick={(id, event) => console.log('Menu click for song', id, event.clientX)}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-10">No songs found. Try searching for "Doraemon".</p>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="playlists">
              <ScrollArea className="h-[calc(100vh-280px)]"> {/* Adjust height */}
              {searchResults.playlists.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-2">
                  {searchResults.playlists.map(playlist => (
                    <PlaylistCard key={playlist.id} {...playlist} onClick={(id) => console.log('Playlist clicked:', id)} />
                  ))}
                </div>
                 ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-10">No playlists found.</p>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
        <MusicPlayerControls
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={() => console.log('Next')}
          onPrev={() => console.log('Prev')}
        />
      </main>
    </div>
  );
};

export default SearchPage;