import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Package, Star, MapPin } from 'lucide-react';
import { Material, Order } from '../../types';
import { mockMaterials } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import StatusBadge from '../UI/StatusBadge';
import LoadingSpinner from '../UI/LoadingSpinner';

interface CartItem extends Material {
  cartQuantity: number;
}

const MaterialBrowser: React.FC = () => {
  const { state } = useAuth();
  const [materials] = useState<Material[]>(mockMaterials);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const categories = ['All', 'Grains', 'Vegetables', 'Spices', 'Oils', 'Meat', 'Dairy'];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || filterCategory === 'All' || material.category === filterCategory;
    const isAvailable = material.availability !== 'out_of_stock';
    return matchesSearch && matchesCategory && isAvailable;
  });

  const addToCart = (material: Material, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === material.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === material.id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...material, cartQuantity: quantity }];
      }
    });
  };

  const updateCartQuantity = (materialId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== materialId));
    } else {
      setCart(cart.map(item =>
        item.id === materialId ? { ...item, cartQuantity: quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.cartQuantity, 0);
  };

  const placeOrders = async () => {
    setIsLoading(true);
    
    // Simulate API calls for each vendor
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Group cart items by vendor and create orders
    const ordersByVendor = cart.reduce((acc, item) => {
      const vendorId = item.vendorId;
      if (!acc[vendorId]) {
        acc[vendorId] = [];
      }
      acc[vendorId].push(item);
      return acc;
    }, {} as Record<string, CartItem[]>);

    // Clear cart after successful order
    setCart([]);
    setShowCart(false);
    setIsLoading(false);
    
    alert(`Successfully placed orders with ${Object.keys(ordersByVendor).length} vendor(s)!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Browse Materials</h1>
          <p className="mt-1 text-sm text-gray-500">
            Find quality raw materials from trusted vendors
          </p>
        </div>
        <button
          onClick={() => setShowCart(true)}
          className="mt-4 sm:mt-0 relative inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart ({getTotalItems()})
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search materials or vendors..."
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
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
          >
            {categories.map(category => (
              <option key={category} value={category === 'All' ? '' : category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No materials found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Shopping Cart</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b border-gray-200 pb-4">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.vendorName}</p>
                        <p className="text-sm font-medium text-green-600">₹{item.price}/{item.unit}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.cartQuantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.cartQuantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.cartQuantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-green-600">₹{getTotalPrice()}</span>
                </div>
                <button
                  onClick={placeOrders}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" className="mr-2" />
                  ) : null}
                  Place Orders
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface MaterialCardProps {
  material: Material;
  onAddToCart: (material: Material, quantity: number) => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(material, quantity);
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={material.image || `https://images.pexels.com/photos/4198655/pexels-photo-4198655.jpeg?auto=compress&cs=tinysrgb&w=300`}
          alt={material.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{material.name}</h3>
            <p className="text-sm text-gray-500">{material.category}</p>
          </div>
          <StatusBadge status={material.availability} type="availability" />
        </div>
        
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
          <span className="text-sm text-gray-600">{material.vendorName}</span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price:</span>
            <span className="font-medium text-green-600">₹{material.price}/{material.unit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Available:</span>
            <span className="font-medium">{material.quantity} {material.unit}</span>
          </div>
        </div>

        {material.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{material.description}</p>
        )}

        <div className="flex items-center space-x-2">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 hover:bg-gray-50"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max={material.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center border-0 focus:ring-0"
            />
            <button
              onClick={() => setQuantity(Math.min(material.quantity, quantity + 1))}
              className="px-3 py-1 hover:bg-gray-50"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialBrowser;