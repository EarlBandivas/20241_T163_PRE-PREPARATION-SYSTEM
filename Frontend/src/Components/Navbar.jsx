import React, { useState } from 'react';
import { FaBars, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';

const Navbar = ({sidebarToggle, setSidebarToggle}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  

  return (
    <nav className='bg-gray-50 px-4 py-3 flex justify-between'>
      <div className='flex items-center text-xl z-30'>
        <FaBars className='text-black mr-4 cursor-pointer' 
          onClick={() => setSidebarToggle(!sidebarToggle)} aria-label="Menu" />
      </div>
      <div className='flex items-center gap-x-5'>
        <div className='relative md:w-64'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
            <button className='p-1 focus:outline-none text-black' aria-label="Search">
              <FaSearch />
            </button>
          </span>
          <input
            type="text"
            className='w-full px-4 py-1 pl-10 rounded shadow outline-none md:block'
            placeholder="Search..."
          />
        </div>

        <div className='text-black'>
          <FaBell className='w-6 h-6' aria-label="Notifications" />
        </div>

        <div className='relative'>
          <button onClick={toggleDropdown} className='text-black focus:outline-none' aria-label="User menu">
            <FaUserCircle className='w-6 h-6 mt-1'/>
          </button>
          {dropdownOpen && (
            <div className='absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-20'>
              <ul className='text-gray-800'>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Profile</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Settings</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-200">Log Out</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
 