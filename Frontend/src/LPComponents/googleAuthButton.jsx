import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomAlert from './CustomAlert';

const GoogleAuthButton = () => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log('Google login success:', response);

        // Get user info
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v2/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        console.log('Google user info:', userInfo.data);

        // Send to backend
        const backendRes = await axios.post(
          `http://localhost:5000/users/auth/google`,
          {
            email: userInfo.data.email,
          }
        );

        setAlert({ type: 'success', message: 'Login successful!' });

        console.log('Backend response:', backendRes.data);

        if (backendRes.data.token) {
          localStorage.setItem('token', backendRes.data.token);
          localStorage.setItem('userRole', backendRes.data.user.role);

          if (backendRes.data.user.role === 'user') {
            navigate('/users');
          } else {
            setAlert({
              type: 'error',
              message: 'Invalid role. Access denied.',
            });
          }
        }
      } catch (error) {
        console.error('Full error:', error);
        console.error('Error response:', error.response?.data);
        // alert(error.response?.data?.error || 'Login failed. Please try again.');
        setAlert({
          type: 'error',
          message:
            error.response?.data?.error || 'Login failed. Please try again.',
        });
      }
    },
    onError: (error) => {
      console.error('Google OAuth error:', error);
      setAlert({
        type: 'error',
        message: 'Login failed. Please try again.',
      });
    },
  });

  return (
    <div>
      <button
        onClick={() => login()}
        className='flex items-center justify-center w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600'
      >
        <img
          src='https://img.icons8.com/color/16/000000/google-logo.png'
          alt='Google logo'
          className='mr-2'
        />
        Continue with Google
      </button>
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)} // Clear alert on close
        />
      )}
    </div>
  );
};

export default GoogleAuthButton;
