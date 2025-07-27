import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Package, Users, Calendar } from 'lucide-react';
import { mockOrders, mockMaterials } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const VendorAnalytics: React.FC = () => {
  const { state } = useAuth();
  const [timeFilter, setTimeFilter] = useState('month');
  
  const vendorOrders = mockOrders.filter(o => o.vendorId === state.user?.id);
  const vendorMaterials = mockMaterials.filter(m => m.vendorId === state.user?.id);

  const getAnalytics = () => {
    const totalRevenue = vendorOrders
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + o.totalPrice, 0);
    
    const totalOrders = vendorOrders.length;
    const completedOrders = vendorOrders.filter(o => o.status === 'delivered').length;
    const pendingOrders = vendorOrders.filter(o => 
      ['pending', 'confirmed', 'preparing', 'ready'].includes(o.status)
    ).length;
    
    const avgOrderValue = totalOrders > 0 ? totalRevenue / completedOrders || 0 : 0;
    const completionRate = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;
    
    return {
      totalRevenue,
      totalOrders,
      completedOrders,
      pendingOrders,
      avgOrderValue,
      completionRate
    };
  };

  const getTopMaterials = () => {
    const materialOrders = vendorOrders.reduce((acc, order) => {
      const materialId = order.materialId;
      if (!acc[materialId]) {
        acc[materialId] = {
          materialName: order.materialName,
          orders: 0,
          revenue: 0,
          quantity: 0
        };
      }
      acc[materialId].orders += 1;
      acc[materialId].revenue += order.totalPrice;
      acc[materialId].quantity += order.quantity;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(materialOrders)
      .sort((a: any, b: any) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  const getRecentActivity = () => {
    return vendorOrders
      .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
      .slice(0, 5);
  };

  const analytics = getAnalytics();
  const topMaterials = getTopMaterials();
  const recentActivity = getRecentActivity();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your business performance and growth
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 3 Months</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Revenue
                </dt>
                <dd className="text-lg font-semibold text-gray-900">
                  ₹{analytics.totalRevenue.toLocaleString()}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Orders
                </dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {analytics.totalOrders}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Avg Order Value
                </dt>
                <dd className="text-lg font-semibold text-gray-900">
                  ₹{analytics.avgOrderValue.toFixed(0)}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Completion Rate
                </dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {analytics.completionRate.toFixed(1)}%
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Materials */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Top Performing Materials
          </h3>
          <div className="space-y-4">
            {topMaterials.map((material: any, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {material.materialName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {material.orders} orders • {material.quantity} units sold
                  </div>
                </div>
                <div className="text-sm font-medium text-green-600">
                  ₹{material.revenue}
                </div>
              </div>
            ))}
            {topMaterials.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                No sales data available
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((order) => (
              <div key={order.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    order.status === 'delivered' ? 'bg-green-400' :
                    order.status === 'cancelled' ? 'bg-red-400' :
                    'bg-yellow-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-900">
                    <span className="font-medium">{order.serviceProviderName}</span>
                    {' '}ordered {order.materialName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(order.orderDate)} • ₹{order.totalPrice}
                  </div>
                </div>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                No recent activity
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Inventory Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {vendorMaterials.length}
            </div>
            <div className="text-sm text-gray-500">Total Materials</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {vendorMaterials.filter(m => m.availability === 'available').length}
            </div>
            <div className="text-sm text-gray-500">In Stock</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {vendorMaterials.filter(m => m.availability === 'out_of_stock').length}
            </div>
            <div className="text-sm text-gray-500">Out of Stock</div>
          </div>
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Order Status Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { status: 'pending', label: 'Pending', color: 'yellow' },
            { status: 'confirmed', label: 'Confirmed', color: 'blue' },
            { status: 'preparing', label: 'Preparing', color: 'purple' },
            { status: 'ready', label: 'Ready', color: 'indigo' },
            { status: 'delivered', label: 'Delivered', color: 'green' },
            { status: 'cancelled', label: 'Cancelled', color: 'red' }
          ].map(({ status, label, color }) => {
            const count = vendorOrders.filter(o => o.status === status).length;
            return (
              <div key={status} className="text-center">
                <div className={`text-xl font-bold text-${color}-600`}>
                  {count}
                </div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VendorAnalytics;