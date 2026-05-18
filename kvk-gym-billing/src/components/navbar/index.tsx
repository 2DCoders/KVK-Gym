import { useState } from 'react';
import { Menu, X, Search, Bell, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface NavbarProps {
  onSidebarToggle: () => void;
  onMobileDrawerToggle: () => void;
  mobileDrawerOpen: boolean;
}

export default function Navbar({
  onSidebarToggle,
  onMobileDrawerToggle,
  mobileDrawerOpen,
}: NavbarProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  // Get page title from route
  const getTitleFromPath = (path: string) => {
    const titles: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/members': 'Members',
      '/trainers': 'Trainers',
      '/payments': 'Payments',
      '/attendance': 'Attendance',
      '/reports': 'Reports',
      '/settings': 'Settings',
    };
    return titles[path] || 'Dashboard';
  };

  const pageTitle = getTitleFromPath(location.pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-blue-100/50 shadow-sm">
      <div className="h-20 flex items-center justify-between px-4 md:px-8">
        {/* Left Section - Menu Toggle & Title */}
        <div className="flex items-center gap-4">
          {/* Desktop Sidebar Toggle */}
          <button
            onClick={onSidebarToggle}
            className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full hover:bg-light-gray transition-all duration-200 text-gray-700 cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          {/* Mobile Drawer Toggle */}
          <button
            onClick={onMobileDrawerToggle}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-light-gray transition-all duration-200 text-gray-700"
            aria-label="Toggle mobile menu"
          >
            {mobileDrawerOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Page Title */}
          <h1 className="text-xl md:text-xl font-bold text-gray-900 hidden sm:block">
            {pageTitle}
          </h1>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 rounded-full hover:bg-light-gray transition-all duration-200 text-gray-700"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Profile Avatar & Dropdown */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Manager</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-200 transition-all duration-200">
              AU
            </button>
          </div>

          {/* Logout - Desktop */}
          <button
            title="Logout"
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-50 transition-all cursor-pointer duration-200 text-gray-700 hover:text-red-600"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
