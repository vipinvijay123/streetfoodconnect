import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, XCircle, Package } from 'lucide-react';
import { Order } from '../../types';
import { mockOrders } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import StatusBadge from '../UI/StatusBadge';
import LoadingSpinner from '../UI/LoadingSpinner';

const OrderManagement: React.FC = () => {
  const { state } = useAuth();
  const [orders, setOrders] = useState<Order[]>(
    mockOrders.filter(o => o.vendorId === state.user?.id)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.serviceProviderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, deliveryDate: newStatus === 'delivered' ? new Date().toISOString() : order.deliveryDate }
        : order
    ));
    
    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusActions = (order: Order) => {
    switch (order.status) {
      case 'pending':
        return [
          { label: 'Confirm', status: 'confirmed' as const, color: 'bg-blue-600 hover:bg-blue-700' },
          { label: 'Cancel', status: 'cancelled' as const, color: 'bg-red-600 hover:bg-red-700' }
        ];
      case 'confirmed':
        return [
          { label: 'Start Preparing', status: 'preparing' as const, color: 'bg-purple-600 hover:bg-purple-700' }
        ];
      case 'preparing':
        return [
          { label: 'Mark Ready', status: 'ready' as const, color: 'bg-indigo-600 hover:bg-indigo-700' }
        ];
      case 'ready':
        return [
          { label: 'Mark Delivered', status: 'delivered' as const, color: 'bg-green-600 hover:bg-green-700' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage incoming orders from service providers
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
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity & Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.materialName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Order #{order.id} • {formatDate(order.orderDate)}
                      </div>
                      {order.notes && (
                        <div className="text-xs text-gray-400 mt-1">
                          Note: {order.notes}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.serviceProviderName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.quantity} units
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      ₹{order.totalPrice}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={order.status} />
                    {order.deliveryDate && (
                      <div className="text-xs text-gray-500 mt-1">
                        Delivered: {formatDate(order.deliveryDate)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {getStatusActions(order).map((action) => (
                        <button
                          key={action.status}
                          onClick={() => updateOrderStatus(order.id, action.status)}
                          disabled={isLoading}
                          className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium text-white transition-colors ${action.color} disabled:opacity-50`}
                        >
                          {isLoading ? (
                            <LoadingSpinner size="sm" className="mr-1" />
                          ) : null}
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter ? 'Try adjusting your search or filter.' : 'Orders will appear here when service providers place them.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;