import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play } from 'lucide-react';

interface PlaylistCardProps {
  id: string | number;
  playlistName: string;
  imageUrl?: string; // URL for the playlist cover art
  description?: string; // e.g., "By You" or "Curated by App"
  songCount?: number;
  onClick?: (id: string | number) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  id,
  playlistName,
  imageUrl,
  description,
  songCount,
  onClick,
}) => {
  console.log("Rendering PlaylistCard for:", playlistName);

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
    console.log("PlaylistCard clicked:", playlistName);
  };

  return (
    <Card
      className="w-full max-w-xs rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group bg-white dark:bg-gray-800"
      onClick={handleCardClick}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1}>
          <img
            src={imageUrl || '/placeholder.svg'} // Use placeholder if no image
            alt={playlistName}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
            <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold truncate text-gray-800 dark:text-white">
          {playlistName}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {description}
          </CardDescription>
        )}
        {songCount !== undefined && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{songCount} songs</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;