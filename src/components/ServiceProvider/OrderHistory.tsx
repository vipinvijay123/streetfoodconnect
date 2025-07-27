import React, { useState } from 'react';
import { Search, Filter, Download, Package, Calendar, ChevronDown } from 'lucide-react';
import { Order } from '../../types';
import { mockOrders } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import StatusBadge from '../UI/StatusBadge';

const OrderHistory: React.FC = () => {
  const { state } = useAuth();
  const [orders] = useState<Order[]>(
    mockOrders.filter(o => o.serviceProviderId === state.user?.id)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter) {
      const orderDate = new Date(order.orderDate);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case 'today':
          matchesDate = daysDiff === 0;
          break;
        case 'week':
          matchesDate = daysDiff <= 7;
          break;
        case 'month':
          matchesDate = daysDiff <= 30;
          break;
        case 'quarter':
          matchesDate = daysDiff <= 90;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
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

  const getTotalSpent = () => {
    return filteredOrders.reduce((total, order) => total + order.totalPrice, 0);
  };

  const getOrderStats = () => {
    const delivered = filteredOrders.filter(o => o.status === 'delivered').length;
    const cancelled = filteredOrders.filter(o => o.status === 'cancelled').length;
    const total = filteredOrders.length;
    
    return { delivered, cancelled, total };
  };

  const downloadReceipt = (order: Order) => {
    // Simulate receipt download
    alert(`Downloading receipt for Order #${order.id}`);
  };

  const stats = getOrderStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
        <p className="mt-1 text-sm text-gray-500">
          View your complete order history and download receipts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-500">Total Orders</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
          <div className="text-sm text-gray-500">Delivered</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
          <div className="text-sm text-gray-500">Cancelled</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-2xl font-bold text-orange-600">₹{getTotalSpent()}</div>
          <div className="text-sm text-gray-500">Total Spent</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
          </select>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredOrders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{order.materialName}</h3>
                      <p className="text-sm text-gray-500">Order #{order.id} • {order.vendorName}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StatusBadge status={order.status} />
                      <button
                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <ChevronDown className={`h-5 w-5 transform transition-transform ${
                          expandedOrder === order.id ? 'rotate-180' : ''
                        }`} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Quantity:</span>
                      <div className="font-medium">{order.quantity} units</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Total:</span>
                      <div className="font-medium text-green-600">₹{order.totalPrice}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Order Date:</span>
                      <div className="font-medium">{formatDate(order.orderDate)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Delivery:</span>
                      <div className="font-medium">
                        {order.deliveryDate ? formatDate(order.deliveryDate) : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Order Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Material:</span>
                          <span>{order.materialName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vendor:</span>
                          <span>{order.vendorName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity:</span>
                          <span>{order.quantity} units</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Unit Price:</span>
                          <span>₹{(order.totalPrice / order.quantity).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Total Amount:</span>
                          <span className="text-green-600">₹{order.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ordered:</span>
                          <span>{formatDate(order.orderDate)}</span>
                        </div>
                        {order.deliveryDate && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Delivered:</span>
                            <span>{formatDate(order.deliveryDate)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <StatusBadge status={order.status} />
                        </div>
                      </div>
                      
                      {order.status === 'delivered' && (
                        <button
                          onClick={() => downloadReceipt(order)}
                          className="mt-3 inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Receipt
                        </button>
                      )}
                    </div>
                  </div>

                  {order.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-700">
                        <strong>Notes:</strong> {order.notes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter || dateFilter ? 'Try adjusting your filters.' : 'Your order history will appear here.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;