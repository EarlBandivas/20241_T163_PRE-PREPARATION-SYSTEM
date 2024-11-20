import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import {
  Navbar,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import {
  BellIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  CalendarIcon,
} from '@heroicons/react/24/solid';
import CalendarModal from './SidebarPages/CalendarModal';

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the backend logout endpoint (optional, but good practice)
      await fetch('/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      // Remove the token from localStorage
      localStorage.removeItem('authToken');

      // Redirect to LandingPage (or root '/' route)
      navigate('/'); // Navigating to the LandingPage (or root URL)
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false);

  const handleOpenCalendarModal = () => {
    setCalendarModalOpen(true);
  };

  const handleCloseCalendarModal = () => {
    setCalendarModalOpen(false);
  };

  return (
    <Navbar
      variant='gradient'
      color='blue'
      className='mx-auto max-w-screen-3xl mt-1 px-4 py-3'
    >
      <div className='flex'>
        <Typography
          as='a'
          href='#'
          variant='h6'
          className='mr-4 ml-2 cursor-pointer py-1.5'
        >
          PRE-Preparations
        </Typography>
        <div className='ml-auto flex gap-1 md:mr-4'>
          <IconButton
            variant='text'
            color='white'
            onClick={handleOpenCalendarModal}
          >
            <CalendarIcon className='h-4 w-4' color='white' />
          </IconButton>

          <CalendarModal
            isOpen={isCalendarModalOpen}
            onClose={handleCloseCalendarModal}
          />
          <IconButton variant='text' color='white'>
            <Cog6ToothIcon className='h-4 w-4' />
          </IconButton>
          <IconButton variant='text' color='white'>
            <BellIcon className='h-4 w-4' />
          </IconButton>
          <Menu>
            <MenuHandler>
              <IconButton variant='text' color='white'>
                <ChevronDownIcon className='h-4 w-4' />
              </IconButton>
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

export default Header;
