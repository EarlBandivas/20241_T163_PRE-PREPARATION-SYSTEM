import React from 'react';
import {
  DocumentCheckIcon,
  ArchiveBoxXMarkIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from '@material-tailwind/react';

function Sidebar() {
  return (
    <Card className='h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5'>
      <div className='mb-2 p-4'>
        <Typography variant='h5' color='blue-gray'>
          Dashboard
        </Typography>
      </div>
      <List>
        <ListItem onClick={() => setActiveTab('')}>
          {' '}
          <DocumentIcon className='h-6 w-6 text-gray-500 mr-2' />
          Reports
        </ListItem>
        <ListItem onClick={() => setActiveTab('')}>
          <DocumentCheckIcon className='h-6 w-6 text-gray-500 mr-2' />
          Approved Reports
        </ListItem>
        <ListItem onClick={() => setActiveTab('')}>
          <ArchiveBoxXMarkIcon className='h-6 w-6 text-gray-500 mr-2' />
          Rejected Reports
        </ListItem>
      </List>
    </Card>
  );
}

export default Sidebar;
