// src/components/AdminPage.jsx

import { useState } from 'react';
import Header from './ADComponents/Header';
import Sidebar from './ADComponents/Sidebar';
import Pending from './ADComponents/AdminPages/PendingPage';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function AdminPage() {
  const [activeTab, setActiveTab] = useState();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (activeTab) {
      case 'ACExpenses':
        return <Pending />;
      default:
        return <Pending />;
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
        <div className='flex-1 p-6 overflow-y-auto bg-white text-black'>
          <button
            className='lg:hidden p-2 bg-blue-500 text-white rounded mb-4'
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <XMarkIcon className='h-8 w-8 stroke-2' />
            ) : (
              <Bars3Icon className='h-8 w-8 stroke-2' />
            )}
          </button>
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default AdminPage;
