import React, { useEffect, useState } from 'react';
import { Alert } from '@material-tailwind/react';

const CustomAlert = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger the slide-in effect

    const timer = setTimeout(() => {
      setIsVisible(false); // Hide after 3 seconds
      if (onClose) onClose(); // Call the close function
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <Alert color={type === 'error' ? 'red' : 'green'}>{message}</Alert>
    </div>
  );
};

export default CustomAlert;
