export interface User {
  id: string;
  name: string;
  email: string;
  type: 'vendor' | 'service_provider';
  phone?: string;
  address?: string;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  availability: 'available' | 'low_stock' | 'out_of_stock';
  vendorId: string;
  vendorName: string;
  description?: string;
  image?: string;
}

export interface Order {
  id: string;
  materialId: string;
  materialName: string;
  vendorId: string;
  vendorName: string;
  serviceProviderId: string;
  serviceProviderName: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  notes?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}