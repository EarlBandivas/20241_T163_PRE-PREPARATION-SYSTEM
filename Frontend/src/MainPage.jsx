import React, { useState } from 'react';

import Header from './MPComponents/Header';
import Sidebar from './MPComponents/Sidebar';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Expenses from './MPComponents/SidebarPages/Expenses';
import Items from './MPComponents/SidebarPages/Items';
import Types from './MPComponents/SidebarPages/Types';
import Events from './MPComponents/SidebarPages/Event';

function MainPage() {
  const [activeTab, setActiveTab] = useState();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const renderContent = () => {
    switch (activeTab) {
      case 'Expenses':
        return <Expenses />;
      case 'Items':
        return <Items />;
      case 'Types':
        return <Types />;
      case 'Events':
        return <Events />;
      default:
        return <Expenses />;
    }
  };

  return (
    <>
      <Header />
      <div className='flex flex-col lg:flex-row min-h-screen'>
        <div
          className={`${
            isSidebarOpen ? 'block' : 'hidden'
          } fixed inset-0 z-20 bg-black bg-opacity-50 lg:bg-opacity-0`}
          onClick={toggleSidebar}
        />
        <div
          className={`transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:relative w-64 lg:w-64 lg:min-h-screen z-30 bg-white`}
        >
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className='flex-1 p-8 overflow-y-auto '>
          {/* Toggle button for mobile */}
          <button
            className='lg:hidden p-2 bg-blue-500 text-white rounded mb-4'
            onClick={toggleSidebar}
          >
            <Bars3Icon className='h-8 w-8 stroke-2' />
          </button>
          {/* Render active content */}
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default MainPage;
