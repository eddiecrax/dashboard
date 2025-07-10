import React from 'react';
import { ArrowLeft, Smartphone, Wifi, WifiOff, Bell, User } from 'lucide-react';
import { DashboardType } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  onBack?: () => void;
  dashboardType?: DashboardType;
  onLogout?: () => void;
  onProfile?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, onBack, dashboardType, onLogout, onProfile }) => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getDashboardColor = (type?: DashboardType) => {
    switch (type) {
      case 'ngo': return 'bg-green-600';
      case 'donor': return 'bg-purple-600';
      case 'ministry': return 'bg-red-600';
      default: return 'bg-blue-600';
    }
  };

  const getDashboardIcon = (type?: DashboardType) => {
    switch (type) {
      case 'ngo': return '🏢';
      case 'donor': return '💰';
      case 'ministry': return '🏛️';
      default: return '📊';
    }
  };

  // Placeholder notifications
  const notifications = [
    { id: 1, text: 'New child registered in your community.' },
    { id: 2, text: 'Weekly report is ready.' },
    { id: 3, text: 'App update available.' },
  ];

  // Close dropdowns on outside click
  React.useEffect(() => {
    const closeMenus = () => {
      setShowUserMenu(false);
      setShowNotifications(false);
    };
    if (showUserMenu || showNotifications) {
      window.addEventListener('click', closeMenus);
      return () => window.removeEventListener('click', closeMenus);
    }
  }, [showUserMenu, showNotifications]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className={`${getDashboardColor(dashboardType)} text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {onBack && (
                <Button
                  onClick={onBack}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white hover:bg-opacity-10 p-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getDashboardIcon(dashboardType)}</span>
                <h1 className="text-xl font-semibold">{title}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4 relative">
              {/* Mobile App Status */}
              <div className="hidden md:flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg px-3 py-1.5">
                <Smartphone className="h-4 w-4" />
                <span className="text-sm">CHW App: v2.1.3</span>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                {isOnline ? (
                  <Wifi className="h-4 w-4 text-green-300" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-300" />
                )}
                <span className="text-sm hidden sm:block">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white hover:bg-opacity-10 p-2 relative"
                  onClick={e => { e.stopPropagation(); setShowNotifications(v => !v); }}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                </Button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg z-50 animate-fade-in border border-gray-200">
                    <div className="p-3 font-semibold border-b border-gray-100">Notifications</div>
                    <ul className="max-h-60 overflow-y-auto">
                      {notifications.map(n => (
                        <li key={n.id} className="px-4 py-2 hover:bg-gray-100 text-sm border-b last:border-b-0">{n.text}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* User Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white hover:bg-opacity-10 p-2"
                  onClick={e => { e.stopPropagation(); setShowUserMenu(v => !v); }}
                >
                  <User className="h-5 w-5" />
                </Button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg z-50 animate-fade-in border border-gray-200">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={e => { e.stopPropagation(); setShowUserMenu(false); onProfile && onProfile(); }}
                    >Profile</button>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={e => { e.stopPropagation(); setShowUserMenu(false); onLogout && onLogout(); }}
                    >Logout</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};