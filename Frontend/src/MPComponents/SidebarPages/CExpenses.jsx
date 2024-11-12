import React from 'react';
import { Input, Button, Typography } from '@material-tailwind/react';

function CExpenses() {
  return (
    <div>
      <div className='flex justify-center mb-8'>
        <Typography className='text-2xl'>Computer Expenses</Typography>
      </div>
      <div className='grid md:grid-cols-2  gap-4 m-6 '>
        <div>
          <Input
            variant='static'
            label='Information and Communication Technology (ICT) Equip'
          />
        </div>
        <div>
          <Input variant='static' label='Repair and Maintenance-IT Equipment' />
        </div>
      </div>
      <div className='text-center'>
        <Button color='green'>Add</Button>
      </div>
    </div>
  );
}

export default CExpenses;
