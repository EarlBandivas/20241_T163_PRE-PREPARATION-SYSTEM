import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleAuthButton = ({ onLoginSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Send token to your backend
        const res = await axios.post(`http://localhost:5000/auth/google`, {
          token: tokenResponse.access_token,
        });
        // Pass token to the main app
        onLoginSuccess(res.data.token);
      } catch (error) {
        console.error('Google login failed', error);
      }
    },
    onFailure: (error) => console.log('Google login error', error),
  });

  return (
    <button
      onClick={login}
      className='flex items-center justify-center w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600'
    >
      <img
        src='https://img.icons8.com/color/16/000000/google-logo.png'
        alt='Google logo'
        className='mr-2'
      />
      Continue with Google
    </button>
  );
};

export default GoogleAuthButton;
