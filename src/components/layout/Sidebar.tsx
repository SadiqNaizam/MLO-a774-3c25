import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Home, Search, Library, PlusSquare } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Using shadcn Button for styling consistency

// Doraemon-inspired color theme (example)
const DORAEMON_BLUE = 'bg-blue-500';
const DORAEMON_TEXT_HOVER = 'hover:text-blue-300';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <Link to={to}>
    <Button
      variant="ghost"
      className={`w-full justify-start text-white ${DORAEMON_TEXT_HOVER} mb-2`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </Button>
  </Link>
);

const Sidebar: React.FC = () => {
  console.log("Rendering Sidebar");

  // Placeholder function for creating a new playlist
  const handleCreatePlaylist = () => {
    console.log("Create new playlist clicked");
    // Logic for creating a new playlist, potentially opening a dialog
  };

  return (
    <aside className={`w-64 ${DORAEMON_BLUE} text-white p-4 space-y-6 h-screen flex flex-col`}>
      <div className="text-2xl font-bold mb-6">
        <Link to="/" className={`hover:text-blue-200`}>MusicApp</Link>
      </div>
      <nav className="flex-grow">
        <NavItem to="/" icon={<Home className="h-5 w-5" />} label="Home" />
        <NavItem to="/search" icon={<Search className="h-5 w-5" />} label="Search" />
        <NavItem to="/library" icon={<Library className="h-5 w-5" />} label="Your Library" />
      </nav>
      <div>
        <Button
          variant="ghost"
          className={`w-full justify-start text-white ${DORAEMON_TEXT_HOVER} border-t border-blue-400 pt-4`}
          onClick={handleCreatePlaylist}
        >
          <PlusSquare className="h-5 w-5" />
          <span className="ml-3">Create Playlist</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;