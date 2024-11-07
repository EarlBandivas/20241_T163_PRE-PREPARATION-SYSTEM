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

function Sidebar({ setActiveTab }) {
  return (
    <Card className='h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5'>
      <div className='mb-2 p-4'>
        <Typography variant='h5' color='blue-gray'>
          Fiduciary Expenses
        </Typography>
      </div>
      <List>
        <ListItem onClick={() => setActiveTab('ACExpenses')}>
          Athletics and Cultural Expenses
        </ListItem>

        <ListItem onClick={() => setActiveTab('LExpenses')}>
          Library Expenses
        </ListItem>
        <ListItem onClick={() => setActiveTab('MDExpenses')}>
          Medical and Dental Expenses
        </ListItem>
      </List>
      <div className='mb-2 p-4'>
        <Typography variant='h5' color='blue-gray'>
          Expenses
        </Typography>
      </div>
    </Card>
  );
}

export default Sidebar;
