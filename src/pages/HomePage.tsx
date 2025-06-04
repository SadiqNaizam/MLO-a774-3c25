import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import PlaylistCard from '@/components/PlaylistCard';
import MusicPlayerControls, { Song as PlayerSong } from '@/components/MusicPlayerControls'; // Renamed imported Song to avoid conflict
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

const placeholderPlaylists = [
  { id: '1', playlistName: 'Doraemon Favorites', description: 'My top Doraemon tracks', imageUrl: 'https://placehold.co/300x300/60A5FA/FFFFFF?text=Doraemon+Mix', songCount: 5 },
  { id: '2', playlistName: 'Chill Vibes', description: 'Relax and unwind', imageUrl: 'https://placehold.co/300x300/34D399/FFFFFF?text=Chill+Vibes', songCount: 12 },
  { id: '3', playlistName: 'Workout Beats', description: 'High-energy tracks', imageUrl: 'https://placehold.co/300x300/F59E0B/FFFFFF?text=Workout', songCount: 20 },
  { id: '4', playlistName: 'Study Focus', description: 'Instrumental music for concentration', imageUrl: 'https://placehold.co/300x300/8B5CF6/FFFFFF?text=Study', songCount: 15 },
];

const HomePage = () => {
  console.log('HomePage loaded');
  const [currentSong, setCurrentSong] = useState<PlayerSong | undefined>({
    title: 'Doraemon no Uta',
    artist: 'Kumiko Osugi',
    albumArtUrl: 'https://placehold.co/100x100/60A5FA/FFFFFF?text=DN',
    duration: 180,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);
  const [volume, setVolume] = useState(50);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next track');
  const handlePrev = () => console.log('Previous track');
  const handleSeek = (newProgress: number) => setProgress(newProgress);
  const handleVolumeChange = (newVolume: number) => setVolume(newVolume);

  const handlePlaylistClick = (id: string | number) => {
    console.log(`Navigate to playlist ${id}`);
    // In a real app, you'd navigate: router.push(`/playlist/${id}`);
    setCurrentSong({ title: `Song from Playlist ${id}`, artist: 'Various Artists', albumArtUrl: 'https://placehold.co/100x100/9CA3AF/FFFFFF?text=PList', duration: 200 });
    setIsPlaying(true);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto" style={{ paddingBottom: '90px' }}> {/* Padding for fixed player */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Welcome Back!</h1>
            <p className="text-gray-600 dark:text-gray-400">Discover your next favorite tune.</p>
          </header>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Featured Playlists</h2>
            <ScrollArea className="h-[calc(100vh-300px)]"> {/* Adjust height as needed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pr-4">
                {placeholderPlaylists.map(playlist => (
                  <PlaylistCard
                    key={playlist.id}
                    {...playlist}
                    onClick={() => handlePlaylistClick(playlist.id)}
                  />
                ))}
              </div>
            </ScrollArea>
          </section>
          
          {/* Example of a featured track or quick play section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Quick Play</h2>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Doraemon Opening Theme</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Nostalgia Trip</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => {
                  setCurrentSong({ title: 'Doraemon no Uta', artist: 'Kumiko Osugi', albumArtUrl: 'https://placehold.co/100x100/60A5FA/FFFFFF?text=DN', duration: 180 });
                  setIsPlaying(true);
              }}>
                <PlayCircle className="h-8 w-8 text-blue-500" />
              </Button>
            </div>
          </section>

        </div>
        <MusicPlayerControls
          currentSong={currentSong}
          isPlaying={isPlaying}
          progress={progress}
          volume={volume}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
        />
      </main>
    </div>
  );
};

export default HomePage;