'use client';

import {
  Home,
  ImageIcon,
  Package,
  LayoutGrid,
  Info,
  Phone,
  HelpCircle,
  FileText,
  CreditCard,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar({ isOpen }) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: ImageIcon, label: 'Hero Section', path: '/hero' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: LayoutGrid, label: 'Categories', path: '/categories' },
    { icon: Info, label: 'About Page', path: '/about' },
    { icon: Phone, label: 'Contact Page', path: '/contact' },
    { icon: HelpCircle, label: 'FAQ', path: '/faq' },
    { icon: FileText, label: 'Policies', path: '/policies' },
    { icon: CreditCard, label: 'Payment Settings', path: '/payments' },
    { icon: ShoppingCart, label: 'Orders', path: '/orders' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Store Settings', path: '/settings' },
  ];

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl transition-all duration-300 z-40 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-center">
          {isOpen && (
            <h2 className="text-white font-semibold text-lg">Store Manager</h2>
          )}
          {!isOpen && (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-2 overflow-y-auto">
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center ${isOpen ? 'space-x-3 px-3' : 'justify-center px-2'} py-3 rounded-xl text-left transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
                title={!isOpen ? item.label : undefined}
              >
                <Icon
                  className={`h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 group-hover:text-white'
                  }`}
                />
                {isOpen && (
                  <span
                    className={`font-medium transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-300 group-hover:text-white'
                    }`}
                  >
                    {item.label}
                  </span>
                )}
                {isActive && isOpen && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}

                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      {isOpen && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="text-xs text-slate-400 text-center">
            Store Dashboard v2.0
          </div>
        </div>
      )}
    </aside>
  );
}
