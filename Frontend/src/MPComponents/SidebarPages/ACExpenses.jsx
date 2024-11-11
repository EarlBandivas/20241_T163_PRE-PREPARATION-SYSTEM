import React from 'react';
import { Input } from '@material-tailwind/react';

function ACExpenses() {
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 m-6'>
      <div>
        <Input variant='static' label='Sports and Equipments' />
      </div>
      <div>
        <Input variant='static' label='Honorarium' />
      </div>
      <div>
        <Input variant='static' label='Traveling Expenses' />
      </div>
      <div>
        <Input variant='static' label='Office Supplies Expenses' />
      </div>
      <div>
        <Input variant='static' label='Drugs and Medicine Expenses' />
      </div>
      <div>
        <Input variant='static' label='Gasoline, Oil and Lubricants' />
      </div>
      <div>
        <Input
          variant='static'
          label='Other Supplies and Materials Expenses  (see APP)'
        />
      </div>
      <div>
        <Input variant='static' label='Telephone Expenses-Mobile' />
      </div>
      <div>
        <Input
          variant='static'
          label='Membership Dues and Contributions to Organization'
        />
      </div>
      <div>
        <Input variant='static' label='Rent Expenses-Building & Structures' />
      </div>
      <div>
        <Input variant='static' label='Rent Expenses-Motor Vehicle' />
      </div>
      <div>
        <Input variant='static' label='Rent Expenses-Equipment' />
      </div>
      <div>
        <Input variant='static' label='Representation Expenses' />
      </div>
      <div>
        <Input variant='static' label='Representation Expenses' />
      </div>
    </div>
  );
}

export default ACExpenses;
