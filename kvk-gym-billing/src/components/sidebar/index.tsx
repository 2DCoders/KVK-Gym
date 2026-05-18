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
  const collapsed = !isOpen && !isMobile;

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
        className={`${isMobile ? 'fixed inset-y-0 left-0 z-40' : 'relative'
          } h-full w-full bg-white/95 backdrop-blur-md border-r border-blue-100/50 shadow-lg transition-all duration-300 ease-in-out ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : ''
          } overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent`}
      >
        <div className="flex flex-col h-full">

          {/* Profile Card */}
          {!collapsed && (<div className={`card-premium mx-4 mt-6 mb-6 p-4 ${collapsed ? 'items-center p-3' : ''}`}>
            <div className={`flex items-center gap-3 mb-3 ${collapsed ? 'justify-center' : ''}`}>


              <><div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                AU
              </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-card-foreground text-sm truncate">Admin User</p>
                  <p className="text-ui-sm text-gray-500">Gym Manager</p>
                </div>

              </>
            </div>

            {!collapsed && (
              <div className="pt-3 border-t border-gray-100">
                <p className="text-ui-sm text-gray-500">
                  <span className="font-semibold text-primary">Active Members:</span> 234
                </p>
              </div>
            )}
          </div>
          )}

          {collapsed && (<div className="flex items-center justify-center mt-6 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              AU
            </div>
          </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              const btnBase = `w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} ${collapsed ? 'px-2' : 'px-3'} py-2 rounded-lg transition-colors duration-150`;
              const iconWrapper = `${active ? 'bg-gray-100 text-gray-700' : 'text-gray-400'} w-10 h-10 flex items-center justify-center rounded-md transition`;

              return (
                <div key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`${btnBase} ${active && !collapsed ? 'bg-gray-100 text-gray-900 border-l-4 border-gray-200 shadow-sm' : ''} ${!active && 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
                      <span className={iconWrapper}>
                        <Icon size={18} />
                      </span>
                      {!collapsed && <span className={`text-ui-sm ${active ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}>{item.label}</span>}
                    </div>
                    {!collapsed && item.submenu && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${expanded === item.id ? 'rotate-180' : ''
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
                          className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-all duration-200 ${isActive(subitem.path)
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
          <div className="px-3 mt-4">
            <div className="h-px bg-gray-200"></div>
          </div>

          {/* Logout Button - stick to bottom */}
          <div className="mt-auto p-4 border-t border-gray-100 flex justify-center">
            {!collapsed ? (
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-200 font-medium text-sm group">
                <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                <span>Logout</span>
              </button>
            ) : (
              <button aria-label="Logout" className="w-10 h-10 rounded-full text-red-600 bg-red-50 hover:bg-red-100 flex items-center justify-center transition-all duration-150">
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
