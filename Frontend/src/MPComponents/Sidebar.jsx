import React, { useState } from 'react';
import { Card, Typography, List, ListItem } from '@material-tailwind/react';

function Sidebar({ activeTab, setActiveTab }) {
  // const [isAthleticsModalOpen, setIsAthleticsModalOpen] = useState(false);
  // const [isLibraryModalOpen, setLibraryModalOpen] = useState(false);

  // const handleOpenAthleticsModal = () => {
  //   setIsAthleticsModalOpen(true);
  // };

  // const handleCloseAthleticsModal = () => {
  //   setIsAthleticsModalOpen(false);
  // };

  // const handleOpenLibraryModal = () => {
  //   setLibraryModalOpen(true);
  // };

  // const handleCloseLibraryModal = () => {
  //   setLibraryModalOpen(false);
  // };

  // const [open, setOpen] = React.useState(0);

  // const handleOpen = (value) => {
  //   setOpen(open === value ? 0 : value);
  // };

  return (
    <Card className='h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/10 '>
      <div className='mb-2 p-4'>
        <Typography variant='h5' color='blue-gray'>
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem
          onClick={() => setActiveTab('Expenses')}
          className={`block w-full text-left  ${
            activeTab === 'Expenses' ? 'bg-blue-500 text-white' : ''
          }`}
        >
          Expenses
        </ListItem>
        <ListItem
          onClick={() => setActiveTab('Items')}
          className={`block w-full text-left  ${
            activeTab === 'Items' ? 'bg-blue-500 text-white' : ''
          }`}
        >
          Items
        </ListItem>
        <ListItem
          onClick={() => setActiveTab('Types')}
          className={`block w-full text-left  ${
            activeTab === 'Types' ? 'bg-blue-500 text-white' : ''
          }`}
        >
          Types
        </ListItem>
        <ListItem
          onClick={() => setActiveTab('Events')}
          className={`block w-full text-left ${
            activeTab === 'Events' ? 'bg-blue-500 text-white' : ''
          }`}
        >
          Events
        </ListItem>
      </List>
    </Card>
  );
}

export default Sidebar;
