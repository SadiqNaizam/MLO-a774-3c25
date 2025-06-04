import React from 'react';
import { MoreHorizontal, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
// For context menu, you'd import from shadcn/ui, e.g.
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface SongListItemProps {
  id: string | number;
  songTitle: string;
  artistName: string;
  albumArtUrl?: string;
  duration?: string; // e.g., "3:45"
  isPlaying?: boolean; // If this song is currently playing
  onPlayClick?: (id: string | number) => void;
  onMenuClick?: (id: string | number, event: React.MouseEvent) => void; // To trigger context menu
}

const SongListItem: React.FC<SongListItemProps> = ({
  id,
  songTitle,
  artistName,
  albumArtUrl,
  duration,
  isPlaying = false,
  onPlayClick,
  onMenuClick,
}) => {
  console.log("Rendering SongListItem for:", songTitle);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click if any
    if (onPlayClick) {
      onPlayClick(id);
    }
  };

  const handleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMenuClick) {
      onMenuClick(id, e);
    }
  };

  return (
    <div className={`flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-150 group ${isPlaying ? 'bg-blue-100 dark:bg-blue-900' : ''}`}>
      <div className="flex items-center flex-grow min-w-0 gap-3">
        {albumArtUrl ? (
          <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
             <AspectRatio ratio={1/1}>
                <img src={albumArtUrl} alt={songTitle} className="object-cover w-full h-full" />
             </AspectRatio>
          </div>
        ) : (
          <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-600 flex-shrink-0"></div>
        )}
        <div className="truncate flex-grow">
          <p className={`font-medium truncate ${isPlaying ? 'text-blue-600 dark:text-blue-300' : 'text-gray-800 dark:text-white'}`}>{songTitle}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{artistName}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto flex-shrink-0 pl-3">
        {/* Play button visible on hover or if it's the current playing track context */}
        <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            onClick={handlePlay}
            aria-label={`Play ${songTitle}`}
        >
            <PlayCircle className={`h-6 w-6 ${isPlaying ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`} />
        </Button>

        {duration && <span className="text-sm text-gray-500 dark:text-gray-400 w-10 text-right">{duration}</span>}

        {/* Placeholder for Context Menu Trigger */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMenu}
          aria-label="More options"
          className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </Button>
        {/*
        Example with Shadcn DropdownMenu:
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log('Add to queue', id)}>Add to queue</DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Add to playlist', id)}>Add to playlist...</DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('View artist', id)}>View artist</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        */}
      </div>
    </div>
  );
};

export default SongListItem;