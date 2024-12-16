import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16 border-solid"></div>
    </div>
  );
};

export default Spinner;
