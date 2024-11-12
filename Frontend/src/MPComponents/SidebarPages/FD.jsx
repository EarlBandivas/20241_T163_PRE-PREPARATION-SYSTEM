import React from 'react';
import { Input, Button, Typography } from '@material-tailwind/react';

function FD() {
  return (
    <div>
      <div className='flex justify-center mb-8'>
        <Typography className='text-2xl'>Faculty Development</Typography>
      </div>
      <div className='grid grid-cols-1   gap-4 m-6'>
        <Typography className='text-xl'>Personal Services</Typography>
        <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-8 m-8'>
          <div>
            <Input variant='static' label='Honoraria-Overload' />
          </div>
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
            <Input
              variant='static'
              label='Travel Expenses-Seminars/Conferences/Drivers'
            />
          </div>
          <div>
            <Input variant='static' label='Travel Expenses-Foreign' />
          </div>
          <div>
            <Input variant='static' label='Training Expenses' />
          </div>
          <div>
            <Input
              variant='static'
              label='Faculty Development / Study Grant / Scholarship'
            />
          </div>
          <div>
            <Input
              variant='static'
              label='Office Supplies Expenses (see APP)'
            />
          </div>
          <div>
            <Input variant='static' label='Fuel, Oil and Lubricants Expenses' />
          </div>
          <div>
            <Input
              variant='static'
              label='Textbooks and Instructional Material Expenses'
            />
          </div>
          <div>
            <Input
              variant='static'
              label='Other Supplies and Materials Expenses'
            />
          </div>
          <div>
            <Input variant='static' label='Internet Subscription Expense' />
          </div>
          <div>
            <Input
              variant='static'
              label='Membership Dues and Contributions to Organizations'
            />
          </div>
          <div>
            <Input variant='static' label='Printing and Publication Expenses' />
          </div>
          <div>
            <Input variant='static' label='Subscription Expenses' />
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

export default FD;
