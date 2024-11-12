import React from 'react';
import { Input, Button, Typography } from '@material-tailwind/react';

function DFExpenses() {
  return (
    <div>
      <div className='flex justify-center mb-8'>
        <Typography className='text-2xl'>Development Fee Expenses</Typography>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 m-6'>
        <div>
          <Input variant='static' label='Traveling Expenses' />
        </div>
        <div>
          <Input
            variant='static'
            label='Other Supplies and Materials Expenses'
          />
        </div>
        <div>
          <Input variant='static' label='Representation Expenses' />
        </div>
        <div>
          <Input variant='static' label='Other MOOE' />
        </div>
      </div>
      <div className='text-center'>
        <Button color='green'>Add</Button>
      </div>
    </div>
  );
}

export default DFExpenses;
