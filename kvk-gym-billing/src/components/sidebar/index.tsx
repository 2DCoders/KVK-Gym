import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  CreditCard,
  CheckSquare,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose?: () => void;
}

interface NavSubitem {
  id: string;
  label: string;
  path: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  path: string;
  submenu: NavSubitem[] | null;
}

export default function Sidebar({ isOpen, isMobile, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      submenu: null,
    },
    {
      id: 'members',
      label: 'Members',
      icon: Users,
      path: '/members',
      submenu: null,
    },
    {
      id: 'trainers',
      label: 'Trainers',
      icon: Dumbbell,
      path: '/trainers',
      submenu: null,
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: CreditCard,
      path: '/payments',
      submenu: null,
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: CheckSquare,
      path: '/attendance',
      submenu: null,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      path: '/reports',
      submenu: null,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings',
      submenu: null,
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const isActive = (path: string) => location.pathname === path;

  // Mobile drawer backdrop
  if (isMobile && !isOpen) {
    return null;
  }

  return (
    <>
      <aside
        className={`${
          isMobile ? 'fixed inset-y-0 left-0 z-40' : 'relative'
        } h-full w-72 bg-white/95 backdrop-blur-md border-r border-blue-100/50 shadow-lg transition-all duration-300 ease-in-out ${
          isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : ''
        } overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent`}
      >
        <div className="flex flex-col h-full">

          {/* Profile Card */}
          <div className="mx-4 mt-6 mb-6 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200/50 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                AU
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">Admin User</p>
                <p className="text-xs text-gray-600">Gym Manager</p>
              </div>
            </div>
            <div className="pt-3 border-t border-blue-200/50">
              <p className="text-xs text-gray-600">
                <span className="font-semibold text-primary">Active Members:</span> 234
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <div key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-primary/10 to-blue-50 text-primary border-l-4 border-primary shadow-md shadow-blue-200/30'
                        : 'text-gray-700 hover:bg-light-gray'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    {item.submenu && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          expanded === item.id ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* Submenu */}
                  {item.submenu && expanded === item.id && (
                    <div className="ml-4 mt-1 space-y-1 animate-slide-up">
                      {item.submenu.map((subitem) => (
                        <button
                          key={subitem.id}
                          onClick={() => handleNavigation(subitem.path)}
                          className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                            isActive(subitem.path)
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-gray-600 hover:bg-light-gray'
                          }`}
                        >
                          {subitem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="px-3 mb-4">
            <div className="h-px bg-gray-200"></div>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-100">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-200 font-medium text-sm group">
              <LogOut size={18} className="group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
