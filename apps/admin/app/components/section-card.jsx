'use client';

import { MoreVertical, Edit, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SectionCard({
  title,
  description,
  icon: Icon,
  color,
  stats,
  actions,
  path,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleManage = () => {
    router.push(path);
  };

  const handleAction = (action) => {
    console.log(`${action} clicked for ${title}`);
    setShowDropdown(false);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div
              className={`${color} p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-500 font-medium">{stats}</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <MoreVertical className="h-5 w-5" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-10 animate-in slide-in-from-top-2 duration-200">
                <div className="py-2">
                  <button
                    onClick={() => handleAction('Edit')}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleAction('Add New')}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add New</span>
                  </button>
                  <button
                    onClick={() => handleAction('Delete')}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {actions.slice(0, 2).map((action, index) => (
            <button
              key={index}
              onClick={() => handleAction(action)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                index === 0
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {action}
            </button>
          ))}
          {actions.length > 2 && (
            <span className="text-xs text-gray-500 px-2 py-1.5">
              +{actions.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-100">
        <button
          onClick={handleManage}
          className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors group"
        >
          <span>Manage {title}</span>
          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
