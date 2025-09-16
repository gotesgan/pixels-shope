'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  X,
} from 'lucide-react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

export default function CategoriesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [formData, setFormData] = useState({
    name: '',
    parent: '',
  });

  const AUTH_TOKEN = localStorage.getItem('token') || '';

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const toggleExpanded = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) newExpanded.delete(categoryId);
    else newExpanded.add(categoryId);
    setExpandedCategories(newExpanded);
  };

  // Organize categories into a hierarchy
  const organizeCategories = (categories) => {
    const categoryMap = new Map();
    const rootCategories = [];

    categories.forEach((cat) =>
      categoryMap.set(cat._id, { ...cat, children: [] }),
    );

    categories.forEach((cat) => {
      const parentId = cat.parent?._id || null;
      if (parentId && categoryMap.has(parentId)) {
        categoryMap.get(parentId).children.push(categoryMap.get(cat._id));
      } else {
        rootCategories.push(categoryMap.get(cat._id));
      }
    });

    return rootCategories;
  };

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'http://localhost:3001/api/v1/products/categorys',
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (!res.ok) throw new Error('Failed to fetch categories');
      const result = await res.json();
      setCategories(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Create or update category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name: formData.name,
        parent: formData.parent || null,
        id: editingCategory?._id,
      };

      const res = await fetch(
        'http://localhost:3001/api/v1/products/category',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        const err = await res.json();
        console.error('API Error:', err);
        return;
      }

      fetchCategories();
      setShowAddModal(false);
      setEditingCategory(null);
      setFormData({ name: '', parent: '' });
    } catch (err) {
      console.error('Network Error:', err);
    }
  };

  // Delete category
  const handleDelete = async (categoryId) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(
        `http://localhost:3001/api/v1/products/category/${categoryId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        },
      );
      if (res.ok) fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((c) =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const organizedCategories = organizeCategories(filteredCategories);

  const CategoryItem = ({ category, level = 0 }) => {
    const hasChildren = category.children?.length > 0;
    const isExpanded = expandedCategories.has(category._id);

    return (
      <div className="border-b border-gray-100 last:border-b-0">
        <div
          className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          style={{ paddingLeft: `${level * 24 + 16}px` }}
        >
          <div className="flex items-center space-x-3 flex-1">
            {hasChildren ? (
              <button
                onClick={() => toggleExpanded(category._id)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                )}
              </button>
            ) : (
              <div className="w-6" />
            )}

            {hasChildren ? (
              isExpanded ? (
                <FolderOpen className="h-5 w-5 text-blue-600" />
              ) : (
                <Folder className="h-5 w-5 text-blue-600" />
              )
            ) : (
              <div className="h-5 w-5 bg-gray-300 rounded" />
            )}

            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500">Slug: {category.slug}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {hasChildren
                ? `${category.children.length} subcategories`
                : 'No subcategories'}
            </span>
            <button
              onClick={() => {
                setEditingCategory(category);
                setFormData({
                  name: category.name || '',
                  parent: category.parent?._id || '',
                });
                setShowAddModal(true);
              }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDelete(category._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {hasChildren &&
          isExpanded &&
          category.children.map((child) => (
            <CategoryItem key={child._id} category={child} level={level + 1} />
          ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar isOpen={sidebarOpen} />
        <Navbar
          toggleSidebar={toggleSidebar}
          storeName="My Store"
          sidebarOpen={sidebarOpen}
        />
        <main
          className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} pt-16`}
        >
          <div className="p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading categories...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <Navbar
        toggleSidebar={toggleSidebar}
        storeName="My Store"
        sidebarOpen={sidebarOpen}
      />
      <main
        className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} pt-16`}
      >
        <div className="p-6 space-y-6">
          {/* Header & Add Button */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Categories Management
                </h1>
                <p className="text-gray-600">
                  Organize your products with categories and subcategories
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add Category</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">
                  {categories.length}
                </div>
                <div className="text-sm text-blue-600">Total Categories</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-700">
                  {organizedCategories.length}
                </div>
                <div className="text-sm text-green-600">Root Categories</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">
                  {categories.filter((c) => c.parent).length}
                </div>
                <div className="text-sm text-purple-600">Subcategories</div>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Tree */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Category Hierarchy
              </h2>
            </div>

            {organizedCategories.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {organizedCategories.map((category) => (
                  <CategoryItem key={category._id} category={category} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No categories found
                </h3>
                <p className="text-gray-600 mb-4">
                  Create your first category to organize your products
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Category
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                    setFormData({ name: '', parent: '' });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Category (Optional)
                  </label>
                  <select
                    value={formData.parent}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        parent: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">None (Main Category)</option>
                    {categories
                      .filter(
                        (c) => !c.parent && c._id !== editingCategory?._id,
                      )
                      .map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingCategory(null);
                      setFormData({ name: '', parent: '' });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingCategory ? 'Update Category' : 'Add Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
