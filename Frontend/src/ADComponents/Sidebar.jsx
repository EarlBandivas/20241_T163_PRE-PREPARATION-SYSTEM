import React from 'react';
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
        <ListItem onClick={() => setActiveTab('ACExpenses')}>
          Approved Report
        </ListItem>

        <ListItem onClick={() => setActiveTab('LExpenses')}>
          Rejected Reports
        </ListItem>
      </List>
    </Card>
  );
}

export default Sidebar;
