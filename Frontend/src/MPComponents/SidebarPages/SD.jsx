import React from 'react';
import { Input, Button, Typography } from '@material-tailwind/react';

function SD() {
  return (
    <div>
      <div className='flex justify-center mb-8'>
        <Typography className='text-2xl'>Student Development</Typography>
      </div>
      <div className='grid grid-cols-1   gap-4 m-6'>
        <Typography className='text-xl'>Personal Services</Typography>
        <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-8 m-8'>
          <div>
            <Input
              variant='static'
              label='Honoraria/Incentives-/Lecturers/Resource Persons'
            />
          </div>
        </div>
        <Typography className='text-xl'>
          Maintenance and Other Operating Expenses
        </Typography>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-8 m-8'>
          <div>
            <Input variant='static' label='Travel Expenses' />
          </div>

          <div>
            <Input variant='static' label='Training Expenses' />
          </div>
          <div>
            <Input variant='static' label=' Scholarship Grant/expenses' />
          </div>
          <div>
            <Input variant='static' label='Office Supplies Expenses' />
          </div>
          <div>
            <Input
              variant='static'
              label='Other Supplies and Materials Expenses'
            />
          </div>
          <div>
            <Input variant='static' label='Printing and Publication Expenses' />
          </div>
          <div>
            <Input variant='static' label='Representation Expenses' />
          </div>
          <div>
            <Input variant='static' label='General Service ' />
          </div>
          <div>
            <Input variant='static' label='R/M-Office Equipment' />
          </div>
          <div>
            <Input variant='static' label='R/M-furniture and Fixtures' />
          </div>

          <div>
            <Input variant='static' label='Insurance Expenses' />
          </div>
          <div>
            <Input variant='static' label='Other MOOE' />
          </div>
        </div>
      </div>
      <div className='text-center'>
        <Button color='green'>Add</Button>
      </div>
    </div>
  );
}

export default SD;
