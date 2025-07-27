import React from 'react';
import { Package, ShoppingCart, BarChart3, Users, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { state } = useAuth();
  const isVendor = state.user?.type === 'vendor';

  const vendorNavItems = [
    { id: 'inventory', label: 'My Inventory', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'team', label: 'About Team', icon: Users }
  ];

  const serviceProviderNavItems = [
    { id: 'browse', label: 'Browse Materials', icon: Package },
    { id: 'my-orders', label: 'My Orders', icon: ShoppingCart },
    { id: 'history', label: 'Order History', icon: BarChart3 },
    { id: 'team', label: 'About Team', icon: Users }
  ];

  const navItems = isVendor ? vendorNavItems : serviceProviderNavItems;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden z-20"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-5 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors
                  ${isActive
                    ? 'bg-orange-100 text-orange-900 border-r-2 border-orange-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`
                  mr-3 flex-shrink-0 h-6 w-6
                  ${isActive ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500'}
                `} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="text-xs text-orange-800 font-medium">
              Welcome, {state.user?.name}!
            </div>
            <div className="text-xs text-orange-600 mt-1 capitalize">
              {state.user?.type.replace('_', ' ')} Dashboard
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;