import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './MPComponents/Header';
import Sidebar from './MPComponents/Sidebar';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Expenses from './MPComponents/SidebarPages/Expenses/Expenses';
import Items from './MPComponents/SidebarPages/Items/Items';
import Types from './MPComponents/SidebarPages/Types/Types';
import Events from './MPComponents/SidebarPages/Events/Event';
import Spinner from './Spinner'; // Assuming you have a Spinner component for loading state

function MainPage() {
  const [activeTab, setActiveTab] = useState('Expenses'); // Default to 'Expenses' to prevent undefined errors
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state for login check
  const navigate = useNavigate();

  // Check if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Logging out, current token:", token); // Debugging line
  

        // if (!token) {
    //   alert("You are not logged in.");
    //   return;
    // }
  
    if (!token) {
      // Redirect to the login page if no token is found
      navigate('/');
    } else {
      setIsLoggedIn(true);
    }
    setIsLoading(false); // Set loading state to false once the check is done
  }, [navigate]);

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

  if (isLoading) {
    // Show a loading spinner or message while the login check is happening
    return <Spinner />;
  }

  if (!isLoggedIn) {
    // Optionally, render nothing or a loading state until login is confirmed
    return null;
  }

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
          className={`transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative w-64 lg:w-64 lg:min-h-screen z-30 bg-white`}
        >
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className='flex-1 p-8 overflow-y-auto'>
          <button
            className='lg:hidden p-2 bg-blue-500 text-white rounded mb-4'
            onClick={toggleSidebar}
          >
            <Bars3Icon className='h-8 w-8 stroke-2' />
          </button>
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default MainPage;
