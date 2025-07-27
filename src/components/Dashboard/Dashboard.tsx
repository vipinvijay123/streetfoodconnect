import React, { useState } from 'react';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { useAuth } from '../../contexts/AuthContext';

// Vendor Components
import InventoryManagement from '../Vendor/InventoryManagement';
import OrderManagement from '../Vendor/OrderManagement';
import VendorAnalytics from '../Vendor/VendorAnalytics';

// Service Provider Components
import MaterialBrowser from '../ServiceProvider/MaterialBrowser';
import ServiceProviderOrders from '../ServiceProvider/ServiceProviderOrders';
import OrderHistory from '../ServiceProvider/OrderHistory';

// Shared Components
import TeamPage from '../Shared/TeamPage';

const Dashboard: React.FC = () => {
  const { state } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    return state.user?.type === 'vendor' ? 'inventory' : 'browse';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    if (state.user?.type === 'vendor') {
      switch (activeTab) {
        case 'inventory':
          return <InventoryManagement />;
        case 'orders':
          return <OrderManagement />;
        case 'analytics':
          return <VendorAnalytics />;
        case 'team':
          return <TeamPage />;
        default:
          return <InventoryManagement />;
      }
    } else {
      switch (activeTab) {
        case 'browse':
          return <MaterialBrowser />;
        case 'my-orders':
          return <ServiceProviderOrders />;
        case 'history':
          return <OrderHistory />;
        case 'team':
          return <TeamPage />;
        default:
          return <MaterialBrowser />;
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;