import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';
import {
  Navbar,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from '@material-tailwind/react';
import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

function Header() {
  const [size, setSize] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleOpen = (value) => setSize(value);

  // Logout handler
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

  // Create User handler
  // const handleCreateUser = async () => {
  //   if (!email || !password || !role) {
  //     setErrorMessage('Email, password, and role are required');
  //     return;
  //   }

  //   try {
  //     const response = await fetch('http://localhost:5000/admin/add', {
  //       // Adjust URL based on your backend
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password, role }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       // Success: Close dialog and reset form
  //       setErrorMessage('');
  //       handleOpen(null); // Close the dialog
  //       alert('User created successfully!');
  //     } else {
  //       // Error: Display the error message
  //       setErrorMessage(data.message || 'An error occurred');
  //     }
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     setErrorMessage('An error occurred while creating the user');
  //   }
  // };

  const handleCreateUser = async () => {
    try {
      const res = await axios.post('http://localhost:5000/admin/add', {
        email,
      }); // Ensure the backend endpoint is correct

      // Check if the response is successful
      console.log('User created:', res.data);

      // Handle success
      alert('User created and verification email sent!');
      handleOpen(null); // Close the dialog
      setEmail(''); // Clear the email input
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage(
        error.response?.data?.message || 'Failed to create user.'
      );
    }
  };

  return (
    <>
      <Navbar
        variant='gradient'
        color='blue'
        className='mx-auto max-w-screen-3xl mt-1 px-4 py-3'
      >
        <div className='flex flex-wrap items-center justify-between gap-y-4 text-white'>
          <Typography
            as='a'
            href='#'
            variant='h6'
            className='mr-4 ml-2 cursor-pointer py-1.5'
          >
            Admin
          </Typography>
          <div className='ml-auto flex gap-1 md:mr-4'>
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
                <MenuItem onClick={() => handleOpen('xs')} variant='gradient'>
                  Create Account
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </Navbar>

      <Dialog
        open={size === 'xs'}
        size={size || 'xs'}
        handler={handleOpen}
        className='grid grid-cols-1 place-items-center'
      >
        <DialogHeader>Create a User Account</DialogHeader>
        <DialogBody>
          <div className='w-72 m-4'>
            <Input
              label='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter user's email"
            />
          </div>
          {errorMessage && (
            <p className='text-red-500 text-sm'>{errorMessage}</p>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={() => handleOpen(null)}
            className='mr-1'
          >
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' color='green' onClick={handleCreateUser}>
            <span>Create User</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Header;
