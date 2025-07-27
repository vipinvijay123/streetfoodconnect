import React from 'react';
import { User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { state, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <div className="flex-shrink-0 ml-2 lg:ml-0">
              <h1 className="text-xl font-bold text-gray-900">
                Street Food Connect
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-orange-100 p-2 rounded-full">
                <User className="h-5 w-5 text-orange-600" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-900">
                  {state.user?.name}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {state.user?.type.replace('_', ' ')}
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;