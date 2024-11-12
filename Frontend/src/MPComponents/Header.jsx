import React from 'react';

import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from '@material-tailwind/react';
import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

function Header() {
  return (
    <Navbar
      variant='gradient'
      color='blue'
      className='mx-auto max-w-screen-3xl mt-1 px-4 py-3'
    >
      <div className='flex'>
        <Typography
          as='a'
          href='#'
          variant='h6'
          className='mr-4 ml-2 cursor-pointer py-1.5'
        >
          PRE-Preparations
        </Typography>
        <div className='ml-auto flex gap-1 md:mr-4'>
          <IconButton variant='text' color='white'>
            <Cog6ToothIcon className='h-4 w-4' />
          </IconButton>
          <IconButton variant='text' color='white'>
            <BellIcon className='h-4 w-4' />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

export default Header;
