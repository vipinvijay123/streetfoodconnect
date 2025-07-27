import React, { useState } from 'react';
import { Search, Filter, Package, Clock, CheckCircle } from 'lucide-react';
import { Order } from '../../types';
import { mockOrders } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import StatusBadge from '../UI/StatusBadge';

const ServiceProviderOrders: React.FC = () => {
  const { state } = useAuth();
  const [orders] = useState<Order[]>(
    mockOrders.filter(o => o.serviceProviderId === state.user?.id && 
      ['pending', 'confirmed', 'preparing', 'ready'].includes(o.status))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
      case 'preparing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'ready':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getEstimatedDelivery = (orderDate: string, status: string) => {
    const order = new Date(orderDate);
    let hoursToAdd = 0;
    
    switch (status) {
      case 'pending':
        hoursToAdd = 4;
        break;
      case 'confirmed':
        hoursToAdd = 3;
        break;
      case 'preparing':
        hoursToAdd = 1;
        break;
      case 'ready':
        hoursToAdd = 0.5;
        break;
      default:
        hoursToAdd = 2;
    }
    
    order.setHours(order.getHours() + hoursToAdd);
    return order.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Active Orders</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your current orders and delivery status
        </p>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready for Pickup</option>
          </select>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {getStatusIcon(order.status)}
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">{order.materialName}</h3>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                  </div>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Vendor:</span>
                  <span className="font-medium">{order.vendorName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{order.quantity} units</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="font-medium text-green-600">₹{order.totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">{formatDate(order.orderDate)}</span>
                </div>
                {order.status !== 'ready' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Est. Ready By:</span>
                    <span className="font-medium text-orange-600">
                      {getEstimatedDelivery(order.orderDate, order.status)}
                    </span>
                  </div>
                )}
              </div>

              {order.notes && (
                <div className="mt-4 p-3 bg-orange-50 rounded-md">
                  <p className="text-sm text-orange-800">
                    <strong>Note:</strong> {order.notes}
                  </p>
                </div>
              )}

              {order.status === 'ready' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-sm text-green-800 font-medium">
                      Ready for pickup! Contact vendor for collection.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No active orders</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter ? 'Try adjusting your search or filter.' : 'Your active orders will appear here.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderOrders;