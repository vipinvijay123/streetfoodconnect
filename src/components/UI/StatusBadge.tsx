import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'availability' | 'order';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'order' }) => {
  const getStatusStyles = () => {
    if (type === 'availability') {
      switch (status) {
        case 'available':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'low_stock':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'out_of_stock':
          return 'bg-red-100 text-red-800 border-red-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    } else {
      switch (status) {
        case 'pending':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'confirmed':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'preparing':
          return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'ready':
          return 'bg-indigo-100 text-indigo-800 border-indigo-200';
        case 'delivered':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'cancelled':
          return 'bg-red-100 text-red-800 border-red-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;