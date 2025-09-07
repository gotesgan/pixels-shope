import { Home, Info, Briefcase, Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({
  isExpanded,
  toggleSidebar,
  mobileOpen,
  closeMobile,
  sendData,
}) => {
  const menuItems = [
    { icon: <Home size={22} />, label: 'Home' },
    { icon: <Info size={22} />, label: 'About' },
    { icon: <Briefcase size={22} />, label: 'Services' },
    { icon: <Phone size={22} />, label: 'Contact' },
  ];
  const [item, setItem] = useState('Home');

  const handleClick = () => {
    sendData(item);
  };
  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-gray-900 text-white z-50 flex flex-col
          transition-all duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          ${isExpanded ? 'w-64' : 'w-20'}
        `}
      >
        {/* Header: Toggle + Close Button */}
        <div className="flex items-center justify-between p-4">
          {/* Toggle button for desktop */}
          <button
            onClick={toggleSidebar}
            className="hidden md:flex items-center gap-2 text-white"
          >
            <Menu size={24} />
            {isExpanded && <span className="text-lg">Menu</span>}
          </button>

          {/* Close button for mobile */}
          <button onClick={closeMobile} className="md:hidden text-white">
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-6 px-4 mt-4">
          <a href="#" className="flex items-center gap-4 hover:text-blue-400">
            {' '}
            <span>
              <Home size={22} />
            </span>
            {/* Desktop: show label only if expanded */}
            <span
              className={`hidden md:${isExpanded ? 'inline' : 'hidden'}`}
              onClick={() => handleClick}
            >
              Home
            </span>
            {/* Mobile: always show label */}
            <span className="md:hidden">{<Home size={22} />}</span>
          </a>

          <a href="#" className="flex items-center gap-4 hover:text-blue-400">
            {' '}
            <span>
              <Info size={22} />
            </span>
            {/* Desktop: show label only if expanded */}
            <span
              className={`hidden md:${isExpanded ? 'inline' : 'hidden'}`}
              onClick={() => setItem('About')}
            >
              About
            </span>
            {/* Mobile: always show label */}
            <span className="md:hidden">{<Info size={22} />}</span>
          </a>

          <a href="#" className="flex items-center gap-4 hover:text-blue-400">
            {' '}
            <span>
              <Briefcase size={22} />
            </span>
            {/* Desktop: show label only if expanded */}
            <span
              className={`hidden md:${isExpanded ? 'inline' : 'hidden'}`}
              onClick={() => setItem('Services')}
            >
              Services
            </span>
            {/* Mobile: always show label */}
            <span className="md:hidden">{<Briefcase size={22} />}</span>
          </a>

          <a href="#" className="flex items-center gap-4 hover:text-blue-400">
            {' '}
            <span>
              <Phone size={22} />
            </span>
            {/* Desktop: show label only if expanded */}
            <span
              className={`hidden md:${isExpanded ? 'inline' : 'hidden'}`}
              onClick={() => setItem('Contact')}
            >
              Contact
            </span>
            {/* Mobile: always show label */}
            <span className="md:hidden">{<Phone size={22} />}</span>
          </a>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
