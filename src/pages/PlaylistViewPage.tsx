import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import SongListItem from '@/components/SongListItem';
import MusicPlayerControls, { Song as PlayerSong } from '@/components/MusicPlayerControls';
import { PlayCircle, Edit3, Trash2, Share2 } from 'lucide-react';

const placeholderPlaylist = {
  id: 'my-doraemon-favs',
  name: 'My Doraemon Favs',
  description: 'A collection of the best Doraemon tunes!',
  coverArtUrl: 'https://placehold.co/200x200/60A5FA/FFFFFF?text=Doraemon+Favs',
  creator: 'User McUserface',
  songs: [
    { id: 's1', songTitle: 'Doraemon no Uta', artistName: 'Kumiko Osugi', albumArtUrl: 'https://placehold.co/40x40/60A5FA/FFFFFF?text=DN', duration: '3:00' },
    { id: 's2', songTitle: 'Aoi Sora wa Pocket sa', artistName: 'Kumiko Osugi', albumArtUrl: 'https://placehold.co/40x40/34D399/FFFFFF?text=AS', duration: '2:45' },
    { id: 's3', songTitle: 'Yume wo Kanaete Doraemon', artistName: 'MAO', albumArtUrl: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=YK', duration: '4:15' },
    { id: 's4', songTitle: 'Boku Doraemon', artistName: 'Nobuyo Ōyama', albumArtUrl: 'https://placehold.co/40x40/EF4444/FFFFFF?text=BD', duration: '2:30' },
  ]
};

const PlaylistViewPage = () => {
  const { id: playlistId } = useParams<{ id: string }>(); // id from route like /playlist/:id
  console.log('PlaylistViewPage loaded for playlist ID:', playlistId);

  // In a real app, fetch playlist data based on playlistId
  const playlist = placeholderPlaylist; // Using placeholder

  const [currentSong, setCurrentSong] = useState<PlayerSong | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (songId: string | number) => {
    const songToPlay = playlist.songs.find(s => s.id === songId);
    if (songToPlay) {
      setCurrentSong({
        title: songToPlay.songTitle,
        artist: songToPlay.artistName,
        albumArtUrl: songToPlay.albumArtUrl,
        duration: 180 // Placeholder
      });
      setIsPlaying(true);
      console.log('Playing song from playlist:', songToPlay.songTitle);
    }
  };

  const playAll = () => {
    if(playlist.songs.length > 0) {
        playSong(playlist.songs[0].id);
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1" style={{ paddingBottom: '90px' }}>
          <div className="p-6 md:p-8">
            <header className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <Avatar className="w-32 h-32 md:w-48 md:h-48 rounded-lg shadow-lg">
                <AvatarImage src={playlist.coverArtUrl} alt={playlist.name} />
                <AvatarFallback className="text-5xl bg-blue-500 text-white">{playlist.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <p className="text-sm text-blue-500 dark:text-blue-400 font-semibold">PLAYLIST</p>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white my-2">{playlist.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-1">{playlist.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Created by: {playlist.creator} &bull; {playlist.songs.length} songs</p>
                <div className="mt-4 flex gap-2 justify-center md:justify-start">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={playAll}>
                    <PlayCircle className="mr-2 h-5 w-5" /> Play All
                  </Button>
                  <Button variant="outline" size="icon" title="Edit Playlist">
                    <Edit3 className="h-5 w-5" />
                  </Button>
                   <Button variant="outline" size="icon" title="Share Playlist">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="destructive" size="icon" title="Delete Playlist">
                     <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </header>

            <section>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Songs</h2>
              <div className="space-y-1">
                {playlist.songs.map((song, index) => (
                  <SongListItem
                    key={song.id}
                    {...song}
                    onPlayClick={() => playSong(song.id)}
                    isPlaying={currentSong?.title === song.songTitle && isPlaying}
                    onMenuClick={(id, event) => console.log('Menu for song', id, event.clientX)}
                  />
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>
        <MusicPlayerControls
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={() => console.log('Next song in playlist')}
          onPrev={() => console.log('Previous song in playlist')}
        />
      </main>
    </div>
  );
};

export default PlaylistViewPage;