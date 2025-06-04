import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider'; // For song progress
import { Play, Pause, SkipForward, SkipBack, Volume2, Maximize2 } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Song {
  title: string;
  artist: string;
  albumArtUrl?: string;
  duration?: number; // in seconds
}

interface MusicPlayerControlsProps {
  currentSong?: Song;
  isPlaying: boolean;
  progress?: number; // 0 to 100
  volume?: number; // 0 to 100
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek?: (value: number) => void;
  onVolumeChange?: (value: number) => void;
}

// Doraemon-inspired color
const DORAEMON_ACCENT_BG = 'bg-blue-100 dark:bg-gray-700';
const DORAEMON_PLAYER_BG = 'bg-white dark:bg-gray-800'; // Brighter background for controls

const MusicPlayerControls: React.FC<MusicPlayerControlsProps> = ({
  currentSong,
  isPlaying,
  progress = 0,
  volume = 50,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
}) => {
  console.log("Rendering MusicPlayerControls. Current song:", currentSong?.title, "Playing:", isPlaying);

  const formatTime = (seconds: number = 0): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <footer className={`fixed bottom-0 left-0 right-0 p-3 ${DORAEMON_PLAYER_BG} border-t border-gray-200 dark:border-gray-700 shadow-md z-50`}>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
        {/* Current Song Info */}
        <div className="flex items-center gap-3 w-1/4 min-w-0">
          {currentSong?.albumArtUrl ? (
            <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
              <AspectRatio ratio={1/1}>
                <img src={currentSong.albumArtUrl} alt={currentSong.title} className="object-cover w-full h-full" />
              </AspectRatio>
            </div>
          ) : <div className="w-12 h-12 rounded bg-gray-200 dark:bg-gray-600 flex-shrink-0"></div>}
          <div className="truncate">
            <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{currentSong?.title || 'No song selected'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentSong?.artist || 'Unknown artist'}</p>
          </div>
        </div>

        {/* Player Controls & Progress */}
        <div className="flex flex-col items-center gap-2 flex-grow w-1/2">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onPrev} aria-label="Previous track">
              <SkipBack className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Button>
            <Button variant="default" size="icon" onClick={onPlayPause} className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10" aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={onNext} aria-label="Next track">
              <SkipForward className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(currentSong?.duration ? (progress / 100) * currentSong.duration : 0)}</span>
            <Slider
              defaultValue={[progress]}
              value={[progress]}
              max={100}
              step={1}
              onValueChange={(value) => onSeek && onSeek(value[0])}
              className="w-full [&>span:first-child]:h-1 [&>span>span]:bg-blue-500 [&>span>span]:h-1"
              aria-label="Song progress"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(currentSong?.duration)}</span>
          </div>
        </div>

        {/* Volume & Other Controls */}
        <div className="flex items-center gap-3 w-1/4 justify-end">
          <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <Slider
            defaultValue={[volume]}
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(value) => onVolumeChange && onVolumeChange(value[0])}
            className="w-24 [&>span:first-child]:h-1 [&>span>span]:bg-blue-500 [&>span>span]:h-1"
            aria-label="Volume"
          />
          <Button variant="ghost" size="icon" aria-label="Full screen player">
            <Maximize2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default MusicPlayerControls;