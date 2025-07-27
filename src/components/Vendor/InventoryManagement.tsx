import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Package } from 'lucide-react';
import { Material } from '../../types';
import { mockMaterials } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import StatusBadge from '../UI/StatusBadge';
import LoadingSpinner from '../UI/LoadingSpinner';

const InventoryManagement: React.FC = () => {
  const { state } = useAuth();
  const [materials, setMaterials] = useState<Material[]>(
    mockMaterials.filter(m => m.vendorId === state.user?.id)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    unit: '',
    quantity: '',
    description: ''
  });

  const categories = ['Grains', 'Vegetables', 'Spices', 'Oils', 'Meat', 'Dairy', 'Others'];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || material.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const materialData: Material = {
      id: editingMaterial?.id || Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      unit: formData.unit,
      quantity: parseInt(formData.quantity),
      availability: parseInt(formData.quantity) > 10 ? 'available' : 
                   parseInt(formData.quantity) > 0 ? 'low_stock' : 'out_of_stock',
      vendorId: state.user?.id || '',
      vendorName: state.user?.name || '',
      description: formData.description
    };

    if (editingMaterial) {
      setMaterials(materials.map(m => m.id === editingMaterial.id ? materialData : m));
    } else {
      setMaterials([...materials, materialData]);
    }

    setFormData({ name: '', category: '', price: '', unit: '', quantity: '', description: '' });
    setShowAddForm(false);
    setEditingMaterial(null);
    setIsLoading(false);
  };

  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
    setFormData({
      name: material.name,
      category: material.category,
      price: material.price.toString(),
      unit: material.unit,
      quantity: material.quantity.toString(),
      description: material.description || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this material?')) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setMaterials(materials.filter(m => m.id !== id));
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', price: '', unit: '', quantity: '', description: '' });
    setShowAddForm(false);
    setEditingMaterial(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Inventory</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your raw materials and track availability
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Material
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
            placeholder="Search materials..."
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
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {editingMaterial ? 'Edit Material' : 'Add New Material'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price per Unit (₹) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit *
              </label>
              <select
                required
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Unit</option>
                <option value="kg">Kilogram (kg)</option>
                <option value="gram">Gram (g)</option>
                <option value="liter">Liter (L)</option>
                <option value="piece">Piece</option>
                <option value="dozen">Dozen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity Available *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Brief description of the material..."
              />
            </div>
            <div className="md:col-span-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 flex items-center"
              >
                {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                {editingMaterial ? 'Update' : 'Add'} Material
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <div key={material.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">₹{material.price}/{material.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Available:</span>
                  <span className="font-medium">{material.quantity} {material.unit}</span>
                </div>
              </div>

              {material.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{material.description}</p>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(material)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(material.id)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No materials found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterCategory ? 'Try adjusting your search or filter.' : 'Get started by adding your first material.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;