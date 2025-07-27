import { Material, Order, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    email: 'ravi@vendor.com',
    type: 'vendor',
    phone: '+91 9876543210',
    address: 'Gandhi Bazaar, Bangalore'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@vendor.com',
    type: 'vendor',
    phone: '+91 9876543211',
    address: 'Commercial Street, Bangalore'
  },
  {
    id: '3',
    name: 'Amit Restaurant',
    email: 'amit@service.com',
    type: 'service_provider',
    phone: '+91 9876543212',
    address: 'MG Road, Bangalore'
  },
  {
    id: '4',
    name: 'Spice Junction Cafe',
    email: 'spice@service.com',
    type: 'service_provider',
    phone: '+91 9876543213',
    address: 'Koramangala, Bangalore'
  }
];

export const mockMaterials: Material[] = [
  {
    id: '1',
    name: 'Basmati Rice',
    category: 'Grains',
    price: 80,
    unit: 'kg',
    quantity: 50,
    availability: 'available',
    vendorId: '1',
    vendorName: 'Ravi Kumar',
    description: 'Premium quality basmati rice',
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    price: 25,
    unit: 'kg',
    quantity: 5,
    availability: 'low_stock',
    vendorId: '1',
    vendorName: 'Ravi Kumar',
    description: 'Fresh, ripe tomatoes',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    name: 'Garam Masala',
    category: 'Spices',
    price: 200,
    unit: 'kg',
    quantity: 0,
    availability: 'out_of_stock',
    vendorId: '2',
    vendorName: 'Priya Sharma',
    description: 'Authentic garam masala blend',
    image: 'https://images.pexels.com/photos/4198655/pexels-photo-4198655.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    name: 'Cooking Oil',
    category: 'Oils',
    price: 120,
    unit: 'liter',
    quantity: 20,
    availability: 'available',
    vendorId: '2',
    vendorName: 'Priya Sharma',
    description: 'Refined sunflower oil',
    image: 'https://images.pexels.com/photos/4198776/pexels-photo-4198776.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '5',
    name: 'Fresh Onions',
    category: 'Vegetables',
    price: 30,
    unit: 'kg',
    quantity: 40,
    availability: 'available',
    vendorId: '1',
    vendorName: 'Ravi Kumar',
    description: 'Fresh red onions',
    image: 'https://images.pexels.com/photos/533342/pexels-photo-533342.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '6',
    name: 'Chicken (Fresh)',
    category: 'Meat',
    price: 220,
    unit: 'kg',
    quantity: 15,
    availability: 'available',
    vendorId: '2',
    vendorName: 'Priya Sharma',
    description: 'Fresh chicken, cleaned and cut',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    materialId: '1',
    materialName: 'Basmati Rice',
    vendorId: '1',
    vendorName: 'Ravi Kumar',
    serviceProviderId: '3',
    serviceProviderName: 'Amit Restaurant',
    quantity: 10,
    totalPrice: 800,
    status: 'delivered',
    orderDate: '2024-01-15T10:30:00Z',
    deliveryDate: '2024-01-16T14:00:00Z',
    notes: 'Delivered on time'
  },
  {
    id: '2',
    materialId: '2',
    materialName: 'Fresh Tomatoes',
    vendorId: '1',
    vendorName: 'Ravi Kumar',
    serviceProviderId: '4',
    serviceProviderName: 'Spice Junction Cafe',
    quantity: 5,
    totalPrice: 125,
    status: 'preparing',
    orderDate: '2024-01-16T09:15:00Z',
    notes: 'Rush order for evening service'
  },
  {
    id: '3',
    materialId: '4',
    materialName: 'Cooking Oil',
    vendorId: '2',
    vendorName: 'Priya Sharma',
    serviceProviderId: '3',
    serviceProviderName: 'Amit Restaurant',
    quantity: 3,
    totalPrice: 360,
    status: 'confirmed',
    orderDate: '2024-01-16T11:45:00Z'
  },
  {
    id: '4',
    materialId: '6',
    materialName: 'Chicken (Fresh)',
    vendorId: '2',
    vendorName: 'Priya Sharma',
    serviceProviderId: '4',
    serviceProviderName: 'Spice Junction Cafe',
    quantity: 2,
    totalPrice: 440,
    status: 'pending',
    orderDate: '2024-01-16T13:20:00Z',
    notes: 'Need by evening for special menu'
  }
];