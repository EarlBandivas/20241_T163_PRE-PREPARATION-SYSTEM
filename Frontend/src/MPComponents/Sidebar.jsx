import React, { useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
  ListItemPrefix,
  ListItemSuffix,
} from '@material-tailwind/react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

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

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className='h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5'>
      <div className='mb-2 p-4'>
        <Typography variant='h5' color='blue-gray'>
          Sidebar
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? 'rotate-180' : ''}`}
            />
          }
        >
          <ListItem className='p-0' selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className='border-b-0 p-3'
            >
              <ListItemPrefix></ListItemPrefix>
              <Typography color='blue-gray' className='mr-auto font-normal'>
                Types
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className='py-1'>
            <List className='p-0'>
              <ListItem onClick={handleOpenAthleticsModal}>
                Athletics and Cultural Expenses
              </ListItem>
              <ListItem onClick={handleOpenLibraryModal}>Reporting</ListItem>
            </List>
          </AccordionBody>
        </Accordion>
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
