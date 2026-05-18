import { Menu, X, Bell, Settings2, MessageSquare } from 'lucide-react';

interface NavbarProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  onMobileDrawerToggle: () => void;
  mobileDrawerOpen: boolean;
}

export default function Navbar({
  sidebarOpen,
  onSidebarToggle,
  onMobileDrawerToggle,
  mobileDrawerOpen,
}: NavbarProps) {
  return (
    <nav className={`fixed top-0 right-0 z-40 h-16 border-b border-gray-200/80 bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-all duration-300 ${sidebarOpen ? 'lg:left-72' : 'lg:left-20'} left-0`}>
      <div className="h-full px-4 md:px-6 flex items-center gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onSidebarToggle}
            className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          <button
            onClick={onMobileDrawerToggle}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileDrawerOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto shrink-0">
          <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors" aria-label="Settings">
            <Settings2 size={18} />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors" aria-label="Messages">
            <MessageSquare size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold shadow-sm">
            KD
          </button>
        </div>
      </div>
    </nav>
  );
}
