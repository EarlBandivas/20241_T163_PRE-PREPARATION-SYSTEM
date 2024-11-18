import React, { useState } from 'react';
import { Card, Typography, List, ListItem } from '@material-tailwind/react';
import AthleticsModal from './SidebarPages/AthleticsModal';
import LibraryModal from './SidebarPages/LibraryModal';

function Sidebar() {
  const [isAthleticsModalOpen, setIsAthleticsModalOpen] = useState(false);
  const [isLibraryModalOpen, setLibraryModalOpen] = useState(false);

  const handleOpenAthleticsModal = () => {
    setIsAthleticsModalOpen(true);
  };

  const handleCloseAthleticsModal = () => {
    setIsAthleticsModalOpen(false);
  };

  const handleOpenLibraryModal = () => {
    setLibraryModalOpen(true);
  };

  const handleCloseLibraryModal = () => {
    setLibraryModalOpen(false);
  };

  return (
    <Card className='h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5'>
      <div className='mb-2 p-4'>
        <Typography variant='h5' color='blue-gray'>
          Expenses
        </Typography>
      </div>
      <List>
        <ListItem onClick={handleOpenAthleticsModal}>
          Athletics and Cultural Expenses
        </ListItem>
        <ListItem onClick={handleOpenLibraryModal}>Library Expenses</ListItem>

        <AthleticsModal
          isOpen={isAthleticsModalOpen}
          onClose={handleCloseAthleticsModal}
        />
        <LibraryModal
          isOpen={isLibraryModalOpen}
          onClose={handleCloseLibraryModal}
        />
      </List>
    </Card>
  );
}

export default Sidebar;
