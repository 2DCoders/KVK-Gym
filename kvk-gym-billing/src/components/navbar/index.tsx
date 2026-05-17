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
            className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full hover:bg-light-gray transition-all duration-200 text-gray-700"
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

          {/* KVK Gym Logo - Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KVK</span>
            </div>
          </div>

          {/* Page Title */}
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 hidden sm:block">
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

          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-light-gray transition-all duration-200 text-gray-700 group">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="absolute inset-0 rounded-full group-hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
          </button>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-gray-200"></div>

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
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-50 transition-all duration-200 text-gray-700 hover:text-red-600"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="md:hidden px-4 pb-4 border-t border-gray-200">
          <div className="flex items-center bg-light-gray rounded-full px-4 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 bg-transparent outline-none text-sm w-full placeholder-gray-500"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
