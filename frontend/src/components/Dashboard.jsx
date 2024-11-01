import React from 'react';
import Navbar from './Navbar';

const Dashboard = ({sidebarToggle, setSidebarToggle}) => {
  return (
    <div className={`transition-all duration-300 ${sidebarToggle ? "" : "ml-64"}`}>
      <Navbar 
      sidebarToggle={sidebarToggle}
      setSidebarToggle={setSidebarToggle}/>
      <h1>Welcome to the Dashboard</h1>
    </div>
  );
};

export default Dashboard;
