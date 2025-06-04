import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import PlaylistCard from '@/components/PlaylistCard';
import SongListItem from '@/components/SongListItem';
import MusicPlayerControls, { Song as PlayerSong } from '@/components/MusicPlayerControls';

const userPlaylists = [
  { id: 'p1', playlistName: 'My Doraemon Favs', description: 'By You', imageUrl: 'https://placehold.co/300x300/60A5FA/FFFFFF?text=Doraemon+Favs', songCount: 4 },
  { id: 'p2', playlistName: 'Japanese Anime Openings', description: 'Curated by MusicApp', imageUrl: 'https://placehold.co/300x300/F87171/FFFFFF?text=Anime+Hits', songCount: 25 },
  { id: 'p3', playlistName: 'Lo-fi Beats to Relax/Study', description: 'By You', imageUrl: 'https://placehold.co/300x300/A78BFA/FFFFFF?text=Lo-fi', songCount: 50 },
];

const likedSongs = [
  { id: 's10', songTitle: 'Kimi wo Nosete', artistName: 'Azumi Inoue', albumArtUrl: 'https://placehold.co/40x40/FDBA74/FFFFFF?text=KN', duration: '3:28' },
  { id: 's11', songTitle: 'Gurenge', artistName: 'LiSA', albumArtUrl: 'https://placehold.co/40x40/DC2626/FFFFFF?text=Gurenge', duration: '3:56' },
];

const LibraryPage = () => {
  console.log('LibraryPage loaded');
  const [currentSong, setCurrentSong] = useState<PlayerSong | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song: { songTitle: string; artistName: string; albumArtUrl?: string; duration?: string }) => {
    setCurrentSong({
      title: song.songTitle,
      artist: song.artistName,
      albumArtUrl: song.albumArtUrl,
      duration: 200 // Placeholder
    });
    setIsPlaying(true);
  };
  
  const handlePlaylistClick = (id: string | number) => {
    console.log(`Navigate to playlist ${id} from library`);
    // Example: set a song from this playlist as current
    const playlist = userPlaylists.find(p => p.id === id);
    if(playlist) {
         setCurrentSong({ title: `${playlist.playlistName} - Track 1`, artist: 'Various', albumArtUrl: playlist.imageUrl, duration: 180 });
         setIsPlaying(true);
    }
  };


  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 flex-1 overflow-y-auto" style={{ paddingBottom: '90px' }}>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Your Library</h1>
          <Tabs defaultValue="playlists" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="liked_songs">Liked Songs</TabsTrigger>
            </TabsList>

            <TabsContent value="playlists">
              <ScrollArea className="h-[calc(100vh-250px)]"> {/* Adjust height */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pr-4">
                  {userPlaylists.map(playlist => (
                    <PlaylistCard key={playlist.id} {...playlist} onClick={handlePlaylistClick} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="liked_songs">
              <ScrollArea className="h-[calc(100vh-250px)]"> {/* Adjust height */}
                <div className="space-y-1 pr-2">
                {likedSongs.map(song => (
                  <SongListItem
                    key={song.id}
                    {...song}
                    onPlayClick={() => playSong(song)}
                    isPlaying={currentSong?.title === song.songTitle && isPlaying}
                    onMenuClick={(id, event) => console.log('Menu for liked song', id, event.clientX)}
                  />
                ))}
                </div>
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

export default LibraryPage;