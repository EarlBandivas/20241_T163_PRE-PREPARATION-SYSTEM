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
  Alert,
} from '@material-tailwind/react';
import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

function Header() {
  const [size, setSize] = useState(null);
  const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  //const [role, setRole] = useState('user');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState('');
  const handleOpen = (value) => setSize(value);
  const [showEmailAlert, setEmailShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const triggerAlert = (message, color) => {
    setSuccessMessage(message);
    setAlertColor(color);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Hide alert after 3 seconds
  };

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
      });
      console.log('User created:', res.data);
      triggerAlert('User created and verification email sent!', 'green');
      handleOpen(null);
      setEmail('');
    } catch (error) {
      triggerAlert('User is already existed', 'red');
      console.error('Error creating user:', error);
      setErrorMessage(
        error.response?.data?.message || 'Failed to create user.'
      );
    } finally {
      handleOpen(null);
      setEmail('');
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

      {showAlert && (
        <div className='fixed top-4 left-1/2 transform -translate-x-1/2 w-auto text-center z-50 '>
          <Alert color={alertColor} className='text-center'>
            {successMessage}
          </Alert>
        </div>
      )}

      <Dialog
        open={size === 'xs'}
        size={size || 'xs'}
        handler={handleOpen}
        className='grid grid-cols-1 place-items-center'
      >
        <DialogHeader>Create a User Account</DialogHeader>
        <DialogBody>
          {showEmailAlert && (
            <Alert
              color='red'
              variant='filled'
              animate={{
                mount: { y: 0 },
                unmount: { y: 100 },
              }}
              onClose={() => setEmailShowAlert(false)}
              className='mb-4'
            >
              {alertMessage}
            </Alert>
          )}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className='w-72 m-4'>
              <Input
                label='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user's email"
                required
              />
            </div>
          </form>
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
          <Button
            variant='gradient'
            color='green'
            onClick={() => {
              if (!email.trim()) {
                setAlertMessage('Please enter an email address');
                return;
              }
              if (email.trim().length <= 10) {
                setAlertMessage('Invalid Email');
                setEmailShowAlert(true);
                return;
              }
              handleCreateUser();
            }}
          >
            <span>Create User</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Header;
