import React from 'react';
import { Input } from '@material-tailwind/react';

function MDExpenses() {
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 m-6'>
      <div>
        <Input variant='static' label='Honoraria-Doctor' />
      </div>
      <div>
        <Input variant='static' label='Traveling Expenses' />
      </div>
      <div>
        <Input variant='static' label='Trainings Expenses' />
      </div>
      <div>
        <Input variant='static' label='Office Supplies Expenses (see APP)' />
      </div>
      <div>
        <Input
          variant='static'
          label='Other Supplies and Materials Expenses  (see APP)'
        />
      </div>
      <div>
        <Input variant='static' label='Medical/Dental Supplies (see APP)' />
      </div>
      <div>
        <Input variant='static' label='Representation Expenses' />
      </div>
      <div>
        <Input variant='static' label='General Services-Medical/Dental/SA' />
      </div>
      <div>
        <Input variant='static' label='Other MOOE' />
      </div>
    </div>
  );
}

export default MDExpenses;
